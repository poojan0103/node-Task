const signupController = require('../controller/SignupController')
const express = require('express')
var router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post('/signup', upload.single('photo'), signupController.signup);
router.post('/login',signupController.login)
module.exports=router;
