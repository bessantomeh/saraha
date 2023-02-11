const Joi = require('joi');

const signup ={
    body:Joi.object().required().keys({
        name:Joi.string().min(3).max(15).required().messages({
            'any.required':'please send your name',
            'string.empty':'name is required'
        }),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(20).required(),
        cpassword:Joi.required().valid(Joi.ref('password')).required()
    })
}

const signin ={
   body:Joi.object().required().keys({
    email:Joi.string().email().required().messages({
        'any.required':'please send your email'
    }),
    password:Joi.string().required()
   })
  
}
const sendcode ={
    body:Joi.object().required().keys({
        email:Joi.string().email().required().messages({
            'any.required':'please send your email'
        })
    })

}
const forgetpassword={
    body:Joi.object().required().keys({
        code:Joi.string().required(),
        email:Joi.string().email().required(),
        newPassword:Joi.string().min(5).max(20).required(),
        
    })
}
const refreshtoken={
  
        params:Joi.object().required().keys({
            token:Joi.string().required()
        })
    
    }
const confirmEmail={
  
    params:Joi.object().required().keys({
        token:Joi.string().required()
    })

}
module.exports={signup,signin,sendcode,forgetpassword,refreshtoken,confirmEmail}