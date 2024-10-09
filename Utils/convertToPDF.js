const fs = require('fs');
const { model } = require('mongoose');
const path = require('path');
const PDFDocument = require('pdfkit');


function generatePaths(file) {
  const imagePath = path.join(__dirname, '..', 'Uploads', file.filename);
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

module.exports = { generatePaths, convertImagesToSinglePDF }
