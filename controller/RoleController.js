const roleSchema = require('../model/RoleSchema')

const malier = require('nodemailer');
const invitation = async(email,role,invitationCode)=>{
    try{
    const transporter = malier.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass:''

        }
    });
  
      const mailOptions = {
        from: '',
        to: email,
        subject: 'Invitation Code for Signup',
        html: `<p>Your invitation code for signup: ${invitationCode}</p>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to send invitation code' });
        } else {
          console.log('Email sent: ' + info.response);
          res.json({ message: 'Invitation code sent successfully!' });
        }
      });
    }catch(error){
console.log(error,"error");    
}
}
exports.sendInvitation = async (req, res) => {
    try {
      const { email, role } = req.body;
      const invitationCode = generateInvitationCode(8);
      const expiryDate = new Date();
  console.log(invitationCode,"code");
      const newInvitation = new roleSchema({
        email:email,
        role:role,
        invitationCode:invitationCode,
        expiryDate: expiryDate,
      })
      const roleData = await newInvitation.save();
      if(roleData){
        invitation(roleData.email,roleData.role,roleData.invitationCode)
        res.status(200).json(roleData);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  function generateInvitationCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars.charAt(randomIndex);
    }
    return code;
  }