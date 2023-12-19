const SchoolController = require('../controller/SchoolController');
const express = require('express')
var router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post('/school', upload.single('photo'), SchoolController.addSchool);
router.get('/school',SchoolController.getSchool)
module.exports = router;
