const Joi = require('joi');


const updatePassword={
    body:Joi.object().required().keys({
        oldPassword:Joi.string().min(5).max(20).required(),
        newPassword:Joi.string().min(5).max(20).required() 
    }),
    params:Joi.object().required().keys({
        token:Joi.string().required()
    })
}


module.exports={updatePassword}