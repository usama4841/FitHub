const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    // Define image path using path.join()
    console.log('__dirname:', __dirname);
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);
    console.log(imagePath)
    console.log('Image Path:', imagePath);

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).send('File not found');
        }
    });
});

module.exports = router;
