const { sendMessage } = require("./messages/sendMessages")
const { addAutomationLabel } = require("./threads/modifyLabels")

exports.autoReply=async (auth,threadId,mailDetails, label)=>{
    try {
        const autoResponse=await sendMessage(auth,threadId,mailDetails)

        const addLabels=await addAutomationLabel(auth,threadId, label);
    } catch (error) {
        console.error(error)
    }

}