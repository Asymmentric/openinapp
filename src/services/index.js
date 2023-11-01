const {authorize}=require('./authorize')
const { autoReply } = require('./autoReply')
const {getMessageById,getMessages}=require('./messages/getMessages')
const { sendMessage } = require('./messages/sendMessages')
const { getThreads } = require('./threads/getThreads')


module.exports={
  authorize,
  getMessageById,
  getMessages,
  sendMessage,
  getThreads,
  autoReply
}
