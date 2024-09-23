const express = require('express');
const router = express();
const authController = require('../Controller/Auth.Controller');


router.post('/register',authController.Register);
router.post('/login',authController.login);


module.exports = router;


