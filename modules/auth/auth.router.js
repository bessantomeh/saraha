const { validation } = require('../../middlewear/validation');
const authcontroller = require('./controller/auth.controller');
const authvalidation =require('./auth.validation')

const router=require('express').Router();

router.get('/',(req,res)=>{
   res.json({message:"auth modules"})
})

router.post('/signup',validation(authvalidation.signup),authcontroller.signup)
router.get('/confirmemail/:token',validation(authvalidation.confirmEmail),authcontroller.confirmEmail)
router.get('/rftoken/:token',validation(authvalidation.refreshtoken),authcontroller.refreshtoken)
router.get('/signin',validation(authvalidation.signin),authcontroller.signin)
router.get('/sendcode',validation(authvalidation.sendcode),authcontroller.sendcode)
router.get('/forgetpassword',validation(authvalidation.forgetpassword),authcontroller.forgetpassword)
router.get('/qacode_alluser',authcontroller.qaCodeAllUser)
router.get('/getalluser',authcontroller.getAlluser)

module.exports=router