const { userModel } = require("../../../DB/modle/user.modle");
const cloudinary =require("../../../services/cloudinary")
let bcrypt = require('bcryptjs');

const updatePassword =async (req,res)=>{
try{
  const{oldPassword,newPassword}=req.body;

     const user=await userModel.findById(req.user._id)
        const match= await bcrypt.compare(oldPassword,user.password)
     if(!match){
        res.json({message:"old password invalid"})
          }else{
           
     const hash=await bcrypt.hash(newPassword,parseInt(process.env.saltRound))
     
     const updateUser = await userModel.findByIdAndUpdate(req.user._id,{password:hash})
        if(!updateUser){
         res.json({message:"fail update password"})
       }else{
         res.json({message:"success"})
       }
         }
        }catch(error){
        res.json({message:"catch error",error})
}

}

const uploadprofilepic =async (req,res)=>{
  if(!req.file){
  res.status(400).json({message:"please upload image"})
  }else{
    const {secure_url} =await cloudinary.uploader.upload(req.file.path , {folder:'user/profile'});
    
   //  const imageURL =req.file.destination +'/'+req.file.filename;
  await userModel.findOneAndUpdate({_id:req.user._id},{ profilepic:secure_url})
  res.status(200).json({message:secure_url})
  }
 
}

module.exports={updatePassword,uploadprofilepic}