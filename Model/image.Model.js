const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageName: String,
    imagePath: String,
    pdfPath: String,
    createdAt: { type: Date, default: Date.now }
});

const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;