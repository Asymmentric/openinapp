const { google } = require("googleapis")

exports.addAutomationLabel = async (auth, threadId, label) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth })

        const res = await gmail.users.threads.modify({
            userId: 'me',
            id: threadId,
            requestBody: {
                "addLabelIds": [label],
                removeLabelIds: ['UNREAD']
            }
        })
        console.log(`Added Label to Thread`)

        const threads = res.data.messages;
        if (!threads || threads.length === 0) {
            console.log('No prior replies');

        }
        return threads;
    } catch (error) {
        console.error(error);
        
    }
}