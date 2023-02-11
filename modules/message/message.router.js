const { auth } = require('../../middlewear/auth');
const { validation } = require('../../middlewear/validation');
const { sendMessage, messageList, deleteMessage } = require('./controller/message.controller');
const messagevalidation =require ('./message.validation')
const router=require('express').Router();

router.post('/:reciverid',validation(messagevalidation.sendMessage),sendMessage)
router.get('/messages',auth(),messageList)
router.delete('/:id',auth(),validation(messagevalidation.deleteMessage),deleteMessage)


module.exports=router