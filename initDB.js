const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.staging';
dotenv.config({ path: envFile });

mongoose.connect(process.env.DATA_BASE_URL, {
    // useNewUrlParser: true,  
    // useUnifiedTopology: true    
}).then(() => {
    console.log("Database is connected successfully");
}).catch((error) => {
    console.error("Database is not connected", error);
});
