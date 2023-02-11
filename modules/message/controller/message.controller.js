const { userModel } = require("../../../DB/modle/user.modle");
const { messageModel } = require("../../../DB/modle/message.modle");


const sendMessage = async (req,res)=>{
 
    const {reciverid}=req.params;
    const {message}=req.body;
    const user=await userModel.findById(reciverid);
    if(!user){
        res.json({message:"recived not found"})
    }
    else{
        const newMessage=new messageModel({text:message,reciverid})
        const savedMessage=await newMessage.save();
        res.json({message:"success",savedMessage})


    }


}

const messageList =async (req,res)=>{
    const message= await messageModel.find({reciverid:req.user._id});
    res.json({message:"success",message})
}
const deleteMessage =async (req,res)=>{
   const{id}=req.params;// message id
   const userId=req.user._id;
   const message =await messageModel.findOneAndDelete({_id:id,reciverid:userId})
   if(!message){
     res.json({message:'invalid delete message'})
   }else{
    res.json({message:' message delete '})

   }
}
module.exports={sendMessage,messageList,deleteMessage}