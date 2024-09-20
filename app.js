const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const apiV1Router = express.Router();
const PORT = process.env.PORT || 3001

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./initDB')
const authRoute = require('./Route/Auth.Route');
apiV1Router.use('/auth',authRoute)

app.use("/api/v1", apiV1Router);

app.listen(PORT, () => {
    console.log(`HTTP Server started on port ${PORT}...`);
});


