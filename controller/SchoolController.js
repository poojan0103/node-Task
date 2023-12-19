const SchoolSchema = require('../model/SchoolSchema')
const fs = require('fs');

exports.addSchool = async(req,res)=>{
    try {
        const {name,Photo,user} = req.body
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo' });
        }
        const uploadDir = 'uploads/';
        const photoFileName = Date.now() + '-' + req.file.originalname;
        const photoFilePath = uploadDir + photoFileName;
        await fs.promises.writeFile(photoFilePath, req.file.buffer); 
        const School = new SchoolSchema({
            name: name,
            photo:photoFilePath,
            user:user
        })
        const schoolData = await School.save();
        if(schoolData){
            res.status(200).json({
                message:'Successfully added the data',
                data:schoolData
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
}
exports.getSchool = async (req, res) => {
    try {
        const data = await SchoolSchema.find().populate('user');
        if (data.length === 0) {
            res.status(400).json({
                message: "No Data Found"
            });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};
