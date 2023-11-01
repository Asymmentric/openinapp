const { authorize, getMessages, getThreads, autoReply } = require("./services");
const { createLabel, deleteLabel } = require("./services/labels/createLabel");
const { getMailSender } = require("./services/messages/getMessages");
const dotenv=require('dotenv').config()
exports.executeAutomationAtRandomIntervals=async ()=>{
    
    try {
        const randomRepetition=Math.floor(Math.random() * (120 - 45 + 1)) + 45
        console.log(randomRepetition)
        setInterval(this.sendAutomatedMails, randomRepetition*1000);
    } catch (error) {
        console.error(error)

    }
}

exports.sendAutomatedMails = async () => {
    try {
        const auth = await authorize();

        //Creating a new label 'AUTO-REPLIED'
        const automationLabel=await createLabel(auth,'AUTO-REPLIED')

        //Getting latest, unread messages from inbox and also exluding the messages from 'AUTO-REPLIED' Label
        const listMessages = await getMessages(auth);

        listMessages.map(async message => {

            //Getting message threads from all messages
            const threadMessages = await getThreads(auth, message.threadId)

            //Extracting the sender's Email
            const senderHeaders=threadMessages[0].payload.headers.filter(header=>header.name==='From')

            const reciever = getMailSender(senderHeaders)
            
            if (threadMessages.length === 1) {  //First message of the thread
                
                await autoReply(auth, message.threadId, reciever,automationLabel);

            } else if (threadMessages.length > 1) {

                const alreadyReplied = this.checkIfAlreadyReplied(threadMessages);
                
                if (!alreadyReplied) {

                    await autoReply(auth, message.threadId, reciever,automationLabel);

                }
                else console.log('Already Replied...')

            } else console.log('No new updates....')

        })
    } catch (error) {
        console.error(error);
        
    }
}

exports.checkIfAlreadyReplied = (threadMessages) => {
    try {
        let replied=false;
        threadMessages.forEach(threadMessage => {
            threadMessage.payload.headers.forEach(header => {

                if (header.name === 'From') {
                    if(header.value==='hrimesomec@gmail.com')
                    replied=true;
                }
            })
        })
        return replied
    } catch (error) {
        console.error(error);
        
    }
}
