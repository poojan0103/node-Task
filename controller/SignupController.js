const singnupSchema = require('../model/SignupSchema')
const bcrypt = require('../utils/encrypt')
const malier = require('nodemailer');
const secertkey = "seceretkey"
const jwt = require('jsonwebtoken');
const fs = require('fs');
const roleSchema = require('../model/RoleSchema');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, Image ,Invitecode} = req.body;
        const existingUser = await singnupSchema.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email'
            });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo' });
        }
        const invitation = await roleSchema.find({ invitationCode: Invitecode});
        let data = invitation.map(data=>data.isUsed)
        console.log(data,"use");
        if (!invitation || data.includes(true)) {
            return res.status(400).json({ message: "Invalid or already used code" });
          }
          invitation.isUsed = true;
        let hash = await bcrypt.hashPassword(req.body.password)
        const uploadDir = 'uploads/';
        const photoFileName = Date.now() + '-' + req.file.originalname;
        const photoFilePath = uploadDir + photoFileName;
        await fs.promises.writeFile(photoFilePath, req.file.buffer); 
        const user = new singnupSchema({
            name: name,
            email: email,
            password: hash,
            photo: photoFilePath ,
            Invitecode:Invitecode,
            role:invitation.role,
        });
        const userData = await user.save();
        if(userData){            
            res.status(200).json({
                message: 'Signup SuceessFully',
                user: user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await singnupSchema.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }
        const isMatch = await bcrypt.comparePassword(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }
        const token = jwt.sign({
            _id: user._id,
           
        }, secertkey, { expiresIn: '5h' })
        res.status(200).json({
            message: 'User logged in successfully',
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.
            message
        })
    }
}