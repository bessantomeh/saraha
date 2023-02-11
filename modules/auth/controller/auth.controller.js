let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {userModel}=require('../../../DB/modle/user.modle');
const { sendEmail } = require('../../../services/email');
const { nanoid } =require('nanoid') 
var QRCode = require('qrcode')
const signup =async (req,res)=>{
  
    const {name,email,password}=req.body;

    const user = await userModel.findOne({email});
    if(user){
      res.status(409).json({message:"user exist"})
    }else{
       let hashpassword= await bcrypt.hash(password,8)
      const newuser=new userModel({userName:name,email,password:hashpassword})
      const saveduser=await newuser.save();

      if(!saveduser){
        res.status(400).json({message:"fail to signup"})
      }else{
        let  token =await jwt.sign({id:saveduser._id},process.env.CONFIRMEMAILTOKEN,{expiresIn:'1h'})
        let  refreshtoken =await jwt.sign({id:saveduser._id},process.env.refreshtokenemail)
       
        let message=`
        
        <a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmemail/${token}">verify email </a>
        `;
        let messageRefresh=`
        
        <a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/rftoken/${refreshtoken}">Resend verify email </a>
        `;
        await sendEmail(email,'confrim Email',`${message}<br/> ${messageRefresh}`);
        res.status(201).json({message:"success"})

      }
    }
}

const confirmEmail =async (req,res)=>{
  try{
     const {token}=req.params;
    const decoded=jwt.verify(token,process.env.CONFIRMEMAILTOKEN)
    if(!decoded){
        res.json({message:"invalid token payload"})
    }else{
        let user=await userModel.findByIdAndUpdate(
            {_id:decoded.id,confirmEmail:false},
            {confirmEmail:true}
        )
        res.json({message:"your email is confirmed"})

    }
  }catch{
    res.json({message:"error",error})

  }
   
}

const signin =async (req,res)=>{
  const {email,password}=req.body;
  const user =await userModel.findOne({email})
  if(!user){
    res.json({message:"invalid account"})
  }else{
    if(!user.confirmEmail){
     res.json({message:"please verify your email"})
    }else{
      const match=await bcrypt.compare(password,user.password)
      if(!match){
        res.json({message:"invalid account"})
      }else{
        const token=jwt.sign({id:user._id},process.env.signintoken,{expiresIn:60*60*24})
         res.json({message:"success",token})
      }
    }
  }
}

const sendcode =async (req,res)=>{
  const {email}=req.body;
  const user =await userModel.findOne({email}).select('email');
  if(!user){
      res.json({message:"invalid account"})
  }else{
      const code=nanoid();
      sendEmail(email,'Forget password',`verify code :${code} `);
     const updateUser=await userModel.updateOne({_id:user._id},{sendcode:code})
       if(!updateUser){
        res.json({message:"invalid"})
       }else{
        res.json({message:"success"})
       }

  }
}

const forgetpassword =async (req,res)=>{
  const{code,email,newPassword}=req.body;
  if(code==null){
    res.json({message:"fail"})
  }else{
    const hash =await bcrypt.hash(newPassword,parseInt(process.env.saltRound))
  const user =await userModel.findOneAndUpdate({email,code:sendcode},{password:hash,sendcode:null})

  if(!user){
    res.json({message:"fail"})
  }else{
    res.json({message:"success"})

  }

  }
  
}

const refreshtoken =async (req,ref)=>{
  const {token}=req.params;
  const decoded=jwt.verify(token,process.env.refreshtokenemail)
  if(!decoded?.id){
    res.json({message:"invalid token payload"})
}else{
  const user =await userModel.findById(decoded.id).select('email');
  if(!user){
    res.json({message:"not regsterd account"})
  }else{
    let  token =await jwt.sign({id:user._id},process.env.CONFIRMEMAILTOKEN,{expiresIn:60 *5})
    let message=`
        <a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmemail/${token}">verify email </a>
        `;
        await sendEmail(user.email,'confrim Email',message);
        res.status(201).json({message:"success"})
  }
}
}
const qaCodeAllUser =async(req,res)=>{
  let link =`${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/getalluser`
  QRCode.toDataURL(link, function (err, url) {
    res.json(url)
  })
}
const getAlluser =async(req,res)=>{
  let users =await userModel.find({})
  res.json(users)
}
module.exports={getAlluser,signup,confirmEmail,signin,sendcode,forgetpassword,refreshtoken,qaCodeAllUser}