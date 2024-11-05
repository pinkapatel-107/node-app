const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const apiV1Router = express.Router();
const PORT = 3001
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/Uploads', express.static(path.join(__dirname,'Uploads')));

require('./initDB');
const authRoute = require('./Route/Auth.Route');
const imageConverterRouter = require('./Route/Image.Route');

apiV1Router.use('/auth', authRoute);
apiV1Router.use('/converter', imageConverterRouter);

app.use("/api/v1", apiV1Router);
deleteOldFiles();

app.listen(process.env.PORT, () => {
    console.log(`HTTP Server started on port ${process.env.PORT}...`);
});


