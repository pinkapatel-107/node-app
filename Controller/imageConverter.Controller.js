const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Image = require('../Model/image.Model');
const { generatePaths, convertImagesToSinglePDF } = require('../Utils/convertToPDF')

module.exports = {
  imageToPdf: async (req, res) => {
    try {
      const { pdfPath } = generatePaths(req.files[0]);

      if (!fs.existsSync(path.dirname(pdfPath))) {
        fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
      }

      const imagePaths = req.files.map((file, index) => {
        return path.join(__dirname, '..', 'Uploads', file.filename)
      })

      await convertImagesToSinglePDF(imagePaths, pdfPath);

      const processedFile = {
        pdfUrl: `http://localhost:3001/Uploads/pdfs/${path.basename(pdfPath)}`
      };

      return res.status(200).json({
        status_code: 200,
        message: 'Successfully converted images to a single PDF',
        data: processedFile
      });

    } catch (error) {
      return res.status(500).json({
        status_code: 500,
        message: error.message,
        data: []
      });
    }
  }
}


