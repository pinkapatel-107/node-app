const multer = require('multer');
const path = require('path');

// Define storage for the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'Uploads'); 
    console.log('Uploading file to:', uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log('Generated filename:', filename); 
    cb(null, filename);
  }
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only .jpeg, .jpg, .png, or .webp files are allowed'), false);
//   }
// };

const upload = multer({ storage}).array('images', 10);  
module.exports = upload;