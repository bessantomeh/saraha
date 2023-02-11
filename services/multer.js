const { date } = require('joi');
const multer  = require('multer');
const { nanoid } =require('nanoid') 

const multervalidation ={
  image:['image/jpeg','image/png'],
  pdf:['aplication/pdf']
}

const HME =(error,req,res,next)=>{
 
    if(error){
   res.status(400).json({message:"multer error",error})
 }else{
    next();
 }
}
 

function Mymulter (customvaldation){
  const storage =multer.diskStorage({
   // destination: function (req, file, cb) {
      //  cb(null, "upload/profile")
     // },
     // filename:function(req,file,cb) {
     //   cb(null,Date.now()+"_"+nanoid()+"_"+file.originalname)
   //   }
  })

   function fileFilter(req,file,cb){
    if(customvaldation.includes(file.mimetype) ){
      cb(null,true)
    }else{
        cb("invalid file type",false)
    }
   }
  const upload =multer({dest:'upload',fileFilter,storage});
  return upload;
}
module.exports={Mymulter,HME,multervalidation}