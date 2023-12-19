const StudentController = require('../controller/StudentController')
const express = require('express')
var router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post('/student',upload.single('photo'),StudentController.addStudent)
router.get('/student',StudentController.getAllStudents)
module.exports = router;
