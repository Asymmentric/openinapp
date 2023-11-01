const { google } = require('googleapis');

exports.sendMessage = async (auth, threadId, reciever) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth })

        const raw = prepareEmail(reciever,threadId);

        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw,
                threadId
            }
        })

        console.log(`Email sent to ${reciever}\n`)

        const messageId = res.data;
        return messageId
    } catch (error) {
        console.error(error)
    }
}

function prepareEmail(to,threadId) {
    try {
        const messageBody = {
            to,
            subject: 'Test Vacation automation',
            text: 'Testing an automated reply coz I am going on vacation.'
        }
        
        const emailFormat = [
            `To:${messageBody.to}`,
            `Content-Type:text/html;charset=utf-8`,
            'MIME-version:1.0',
            `Subject: ${messageBody.subject}`,
            `In-Reply-To:${threadId}`,
            `References:${threadId}`,
            '',
            `${messageBody.text}`
        ]

        return Buffer.from(emailFormat.join('\n')).toString('base64')
    } catch (error) {
        console.error(error)
    }
}
