const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Image = require('../Model/image.Model');

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

function generatePaths(file) {
  const imagePath = path.join(__dirname, '..', 'Uploads', file.filename); // Go up one directory and into 'Uploads'
  const pdfPath = path.join(__dirname, '..', 'Uploads', 'pdfs', `CK_Image_to_PDF_${file.filename.split('-')[0]}.pdf`);
  return { pdfPath, imagePath };
}

async function convertImagesToSinglePDF(imagePaths, pdfPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();  // Create a new instance of PDFDocument, which is used to generate a new PDF file.
    const writeStream = fs.createWriteStream(pdfPath);// Create a writable stream to save the generated PDF to the specified path (pdfPath)

    doc.pipe(writeStream);// Pipe the PDF document's output to the write stream (i.e., the file where the PDF will be saved).

    imagePaths.forEach((imagePath, index) => {
      if (index > 0) doc.addPage(); // here merge all image  in single pdf 
      doc.image(imagePath, {
        fit: [500, 500],
        align: 'center',
        valign: 'center'
      });
    });

    doc.end();

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}
