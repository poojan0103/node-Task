const classController = require('../controller/ClassController');
var express=require("express");
var router=express.Router();

router.post('/class',classController.addClass);
router.get('/class',classController.getClass);
router.get('/class/:student',classController.getclassbyid)
router.get('/classmate/:student',classController.getclassmate)

module.exports=router;