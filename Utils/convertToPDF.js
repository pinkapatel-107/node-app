const PDFDocument = require('pdfkit');
const fs = require('fs');

const convertImageToPDF = (imagePath, pdfPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      doc.image(imagePath, {
        fit: [500, 400], 
        align: 'center',
        valign: 'center'
      });

      doc.end();

      writeStream.on('finish', () => {
        resolve();
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = convertImageToPDF;
