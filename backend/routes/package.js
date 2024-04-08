const express = require("express");
const Package = require("../models/PackageSchema");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchgym = require("../middleware/fetchgym");
const fetchuser = require("../middleware/fetchuser");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/NET/Desktop/react/fithub/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize multer
const upload = multer({ storage: storage });

// Create a new package
router.post('/createpackage', fetchgym, upload.single('image'), async (req, res) => {
  try {
    const { title, description, amount } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if req.gym is defined and has an id property
    if (!req.gym || !req.gym.id) {
      return res.status(400).json({ error: 'Gym information is missing in the request' });
    }

    const newPackage = new Package({
      title,
      description,
      amount,
      gym: req.gym.id,
      image: req.file ? path.join('uploads', req.file.filename) : null // Save the path to the uploaded image
    });

    const savedPackage = await newPackage.save();
    res.json(savedPackage); // Respond with the newly created package as JSON
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server Error' }); // Respond with a JSON error message
  }
});



//updating a package
router.put("/updatepackage/:id", upload.single('image'), async (req, res) => {
  const { title, description, amount } = req.body;

  const updatedPackageFields = {};
  if (title) {
    updatedPackageFields.title = title;
  }
  if (description) {
    updatedPackageFields.description = description;
  }
  if (amount) {
    updatedPackageFields.amount = amount;
  }
  if (req.file) {
    updatedPackageFields.image = path.join('uploads', req.file.filename);
  }

  try {
    let packageId = await Package.findById(req.params.id);
    if (!packageId) {
      return res.status(404).json({ error: 'Package not found' });
    }
    let updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { $set: updatedPackageFields },
      { new: true }
    );
    return res.json(updatedPackage);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating package" });
  }
});

// Route to fetch all packages
router.get("/allpackage", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching packages" });
  }
});

//fetching gym specific packages
router.get("/fetchpackages", fetchgym, async (req, res) => {
  try {
    const package = await Package.find({ gym: req.gym.id });
    res.json(package);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error occcurred" });
  }
});

//fetching all packages
router.get("/allpackages", async (req, res) => {
  try {
    const packages = await Package.aggregate([
      {
        $lookup: {
          from: "gymschemas",
          localField: "gym",
          foreignField: "_id",
          as: "gymData",
        },
      },
      {
        $unwind: "$gymData", // Unwinding the result array
      },
      {
        $project: {
          gymname: "$gymData.gymname", // Extracting gymname from the joined data
          title: 1, // You can include other fields from PackageSchema here
          description: 1,
          amount: 1,
          createdAt: 1,
        },
      },
    ]);
    res.json(packages);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching packages" });
  }
});

// Fetching packages according to user's city and state
router.get("/packagesByUserLocation", fetchuser, async (req, res) => {
  try {
    const { city, state } = req.user;

    const packages = await Package.aggregate([
      {
        $lookup: {
          from: "gymschemas",
          localField: "gym",
          foreignField: "_id",
          as: "gymData",
        },
      },
      {
        $unwind: "$gymData",
      },
      {
        $match: {
          "gymData.gymcity": city,
        }
      },
      {
        $project: {
          gym: "$gymData._id",
          gymname: "$gymData.gymname",
          gymcity: "$gymData.gymcity",
          gymstate: "$gymData.gymstate",
          title: 1,
          description: 1,
          amount: 1,
          image: 1,
          createdAt: 1,
        },
      },
    ]);
    res.json(packages);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error occurred while fetching packages" });
  }
});

// Fetching all packages with gym details
router.get("/allpackagesaccordingtocity", async (req, res) => {
  try {
    const packages = await Package.aggregate([
      {
        $lookup: {
          from: "gymschemas",
          localField: "gym",
          foreignField: "_id",
          as: "gymData",
        },
      },
      {
        $unwind: "$gymData",
      },
      {
        $project: {
          gymname: "$gymData.gymname",
          gymcity: "$gymData.gymcity",
          gymstate: "$gymData.gymstate",
          title: 1,
          description: 1,
          amount: 1,
          createdAt: 1,
        },
      },
    ]);
    res.json(packages);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching packages" });
  }
});

// Fetching packages by specific dates
router.get("/packagesByDate", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Both startDate and endDate are required" });
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const packages = await Package.aggregate([
      {
        $lookup: {
          from: "gymschemas",
          localField: "gym",
          foreignField: "_id",
          as: "gymData",
        },
      },
      {
        $unwind: "$gymData",
      },
      {
        $match: {
          createdAt: { $gte: startDateObj, $lte: endDateObj },
        },
      },
      {
        $project: {
          gymname: "$gymData.gymname",
          title: 1,
          description: 1,
          amount: 1,
          createdAt: 1,
        },
      },
    ]);

    res.json(packages);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching packages" });
  }
});

// deleting package
router.delete("/deletepackages/:id", fetchgym, async (req, res) => {
  try {
    // Find the package by ID
    let package = await Package.findById(req.params.id);

    // If the package doesn't exist, return a 404 error
    if (!package) {
      return res.status(404).send("Package not found");
    }

    // Check if the package belongs to the gym associated with the authenticated user
    if (package.gym.toString() !== req.gym.id) {
      return res.status(401).send("Not authorized to delete this package");
    }

    // If the package exists and belongs to the gym, delete it
    let deletedPackage = await Package.findByIdAndDelete(req.params.id);

    // Remove the image file if it exists
    if (deletedPackage.image) {
      const imagePath = path.join(__dirname, '..', deletedPackage.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Return the deleted package as a response
    res.json(deletedPackage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Delete image file route handler
router.delete('/deleteimage/:imageName', fetchgym, async (req, res) => {
    try {
        const imagePath = `uploads/${req.params.imageName}`;

        // Check if the file exists
        if (fs.existsSync(imagePath)) {
            // Delete the file
            fs.unlinkSync(imagePath);
            res.json({ message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// deleting package with id
router.delete("/deletepackagefromadmin/:id", async (req, res) => {
  const { title, description, amount } = req.body;

  let package = await Package.findById(req.params.id);
  if (!package) {
    return res.status(404).send("Not Found");
  }
  let deletedpackage = await Package.findByIdAndDelete(req.params.id);
  res.json(deletedpackage);
});

module.exports = router;
