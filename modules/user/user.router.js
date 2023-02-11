const { auth } = require('../../middlewear/auth');
const { validation } = require('../../middlewear/validation');
const uservalidation =require('./user.validation')
const { Mymulter, HME ,multervalidation} = require('../../services/multer');
const { updatePassword, uploadprofilepic } = require('./controller/user.controller');

const router=require('express').Router();

router.get('/',auth(),(req,res)=>{
   
})
router.patch('/updatePassword',auth(),validation(uservalidation.updatePassword),updatePassword)
router.patch('/profile/pic',auth(),Mymulter(multervalidation.image).single('image'),HME,uploadprofilepic)
module.exports=router