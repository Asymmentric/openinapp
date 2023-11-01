const { google } = require('googleapis');

exports.getMessages = async (auth) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth })

        const res = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 15,
            labelIds: ['INBOX', 'UNREAD'],
            q: '-labels:AUTO-REPLIED AND after:2023/10/31'
        })

        const messages = res.data.messages
        if (!messages || messages.length === 0) {
            console.log('No messages');
            return [];
        }
        console.log(messages.length, 'Unread Messages')
        return messages;
    } catch (error) {
        console.error(error);
    }
}

exports.getMessageById = async (auth, messageId) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth })

        const res = await gmail.users.messages.get({
            userId: 'me',
            id: messageId
        })

        const message = res.data
        if (!message || message.length === 0) {
            console.log('No messages');
            return null;
        }
        const { id, threadId, labelIds, snippet, payload } = message


        const headers = payload.headers.filter(header => header.name === 'Return-Path');

        let mailSender = this.getMailSender(headers)

        return { id, threadId, labelIds, snippet, mailSender }
    } catch (error) {
        console.error(error)
         
    }
}

exports.getMailSender = (headers) => {
    try {
        if(headers || headers.length!==0){
            return headers[0].value
        }
    
        else throw 'No New MESSAGES to be sent'

    } catch (error) {
        console.error(error)
         
    }
}