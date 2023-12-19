const StudentSchema = require('../model/StudentSchema');
const fs = require('fs');

exports.addStudent = async(req,res)=>{
    try {
        const {name,Photo} = req.body
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo' });
        }
        const uploadDir = 'uploads/';
        const photoFileName = Date.now() + '-' + req.file.originalname;
        const photoFilePath = uploadDir + photoFileName;
        await fs.promises.writeFile(photoFilePath, req.file.buffer); 

        const Student = new StudentSchema({
            name: name,
            photo:photoFilePath
        })
        const StudentData = await Student.save();
        if(StudentData){
            res.status(200).json({
                message:'Successfully added the data',
                data:StudentData
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
}
exports.getAllStudents = async (req, res) => {
    try {
        const users = await StudentSchema.find(); 
        const usersWithImageURLs = users.map(user => {
            const userData = user.toObject(); 
            return {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                photo: req.protocol + '://' + req.get('host') + '/' + userData.photo // Image URL
            };
        });
        res.status(200).json({
            message: 'Users fetched successfully with image URLs',
            users: usersWithImageURLs
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
};
