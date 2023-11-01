const { google } = require('googleapis');

exports.getThreads = async (auth, messageId) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth })

        const res = await gmail.users.threads.get({
            userId: 'me',
            id: messageId,
            format:'metadata',
        })

        const threads = res.data.messages;
        if (!threads || threads.length === 0) {
            console.log('No prior replies');

        }
        return threads;
    } catch (error) {
        console.error(error)
    }
}