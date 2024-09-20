const mongoose = require('mongoose');

mongoose.connect(process.env.DATA_BASE_URL, {
    // useNewUrlParser: true,     // Use the new URL parser (optional but recommended)
    // useUnifiedTopology: true 
}).then(() => {
    console.log("Database is connected successfully")
}).catch(() => {
    console.log("Database is not connected")
})