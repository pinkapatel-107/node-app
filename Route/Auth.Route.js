const express = require('express');
const router = express();
const authController = require('../Controller/Auth.Controller');


router.post('/register',authController.Register);

module.exports = router;


