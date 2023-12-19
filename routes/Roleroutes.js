const roleController = require('../controller/RoleController');
const express = require('express')
var router = express.Router();
router.post('/invitationcode',roleController.sendInvitation);

module.exports=router;
