var jwt = require('jsonwebtoken');
const { userModel } = require('../DB/modle/user.modle');

const auth=()=>{

 return async (req,res,next)=>{
   let {token}=req.headers;
   if(!token.startsWith(process.env.authbearertoken)){
      res.json({message:"invalid bearer token"})
   }else{
     token=token.split(process.env.authbearertoken)[1]
      const decoded= await jwt.verify(token,process.env.signintoken)
      const user =await userModel.findById(decoded.id);
      req.user=user
      next();
   }
 }




}
module.exports={auth}