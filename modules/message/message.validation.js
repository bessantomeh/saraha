
const Joi = require('joi');

const sendMessage={
    params:Joi.object().required().keys({
        reciverid:Joi.string().required().min(24).max(24)
    }),
  body:Joi.object().required().keys({
    message:Joi.string().required().min(5).max(500),
    
  })
}
const deleteMessage={
  params:Joi.object().required().keys({
      id:Joi.string().required().min(24).max(24)
  })
}

module.exports={sendMessage,deleteMessage}