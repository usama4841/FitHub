const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Purchase = require('../models/PurchaseSchema');
const fetchuser = require("../middleware/fetchuser");
const Package = require("../models/PackageSchema");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose")
const User = require("../models/UserSchema");
const fetchgym = require("../middleware/fetchgym");
const userpackage = require("../middleware/userpackage");
const Gym = require('../models/GymSchema');

router.post('/purchase', fetchuser, async (req, res) => {
  try {
    const { packageId } = req.body;
    console.log(packageId)
    if (!packageId) {
      return res.status(400).json({ error: 'Package ID is required.' });
    }

    const purchase = new Purchase({ userId: req.user.id, packageId });
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all packages of the logged-in user
router.get('/userPackageDetails', fetchuser, fetchgym, userpackage, async (req, res) => {
  try {
    const userId = req.user.id;
    const userPurchases = await Purchase.find({ userId });

    console.log('Number of user purchases:', userPurchases.length);

    if (userPurchases.length === 0) {
      return res.status(404).json({ error: 'No packages found for the user' });
    }

    const packageDetailsList = [];

    for (const purchase of userPurchases) {
      console.log('Purchase package ID:', purchase.packageId);

      const packageData = await Package.findById(purchase.packageId);
      console.log('Package data:', packageData);

      if (!packageData) {
        console.log('No package found for purchase:', purchase._id);
        continue; // Skip to the next iteration if package data is not found
      }

      const gymData = await Gym.findById(packageData.gym);

      if (!gymData) {
        console.log('No gym found for package:', packageData._id);
        continue; // Skip to the next iteration if gym data is not found
      }

      const packageDetails = {
        packageId: packageData._id,
        gymname: gymData.gymname,
        gymcity: gymData.gymcity,
        gymEmail: gymData.gymemail,
        gymPhone: gymData.gymphone,
        packageTitle: packageData.title,
        packageDescription: packageData.description,
        packageAmount: packageData.amount,
        packageCreatedAt: packageData.createdAt,
        purchaseDate: purchase.purchaseDate
      };
      packageDetailsList.push(packageDetails);
    }

    res.json(packageDetailsList);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error occurred while fetching package details' });
  }
});



// // Route to fetch package details using middleware
// router.get('/packageDetails', fetchuser, fetchgym, userpackage, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userPurchases = await Purchase.find({ userId });

//     if (!packageData) {
//       return res.status(404).json({ error: 'Package not found' });
//     }
//     const purchaseData = await Purchase.findOne({ packageId });

//     if (!purchaseData) {
//       return res.status(404).json({ error: 'Purchase data not found' });
//     }
//     const packageDetails = {
//       packageId: packageData._id,
//       gymname: gymData.gymname,
//       gymcity: gymData.gymcity,
//       gymEmail: gymData.gymemail,
//       gymPhone: gymData.gymphone,
//       packageTitle: packageData.title,
//       packageDescription: packageData.description,
//       packageAmount: packageData.amount,
//       packageCreatedAt: packageData.createdAt,
//       purchaseDate: purchase.purchaseDate
//     };
//     console.log(packageDetails)
//     res.json(packageDetails);
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ error: 'Error occurred while fetching package details' });
//   }
// });

router.get("/packagesByGym", fetchgym, async (req, res) => {
  try {
    const gymId = req.gym.id;

    const packages = await Purchase.aggregate([
      {
        $match: {
          packageId: { $in: await Package.find({ gym: gymId }).distinct('_id') }
        }
      },
      {
        $lookup: {
          from: "packageschemas",
          localField: "packageId",
          foreignField: "_id",
          as: "packageData",
        },
      },
      {
        $unwind: "$packageData",
      },
      {
        $lookup: {
          from: "userschemas",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: "$userData",
      },
      {
        $project: {
          packageId: "$packageData._id",
          userId: "$userData._id",
          username: "$userData.name",
          useremail: "$userData.email",
          userphone: "$userData.phone",
          useraddress: "$userData.address",
          title: "$packageData.title",
          description: "$packageData.description",
          amount: "$packageData.amount",
          image: "$packageData.image",
          createdAt: "$packageData.createdAt",
          purchaseDate: 1
        },
      },
    ]);
    res.json(packages);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error occurred while fetching packages" });
  }
});

router.delete("/deletemember/:id", async (req, res) => {
  try {
    let purchaseId = await Purchase.findById(req.params.id);
    if (!purchaseId) {
      return res.status(404).send("Purchase ID not found in the request");
    }

    const purchaseToDelete = await Purchase.findById(purchaseId);
    if (!purchaseToDelete) {
      return res.status(404).send("Purchase not found");
    }

    let deletedPurchase = await Purchase.findByIdAndDelete(purchaseId);
    res.json(deletedPurchase);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while deleting purchase" });
  }
});



module.exports = router;