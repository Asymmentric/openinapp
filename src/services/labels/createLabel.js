const { google } = require("googleapis")

exports.createLabel = async (auth, labelName) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth })
        
        const labelAlreadyExists = await this.checkIfLabelExists(auth, labelName);

        if (labelAlreadyExists) return labelAlreadyExists.id

        

        const res = await gmail.users.labels.create({
            userId: 'me',
            requestBody: {
                name: labelName,
                messageListVisibility: 'show',
                labelListVisibility: 'labelShow',
                type: 'user'
            }
        })

        const labels = res.data
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n")
        if (!labels || labels.length === 0) {
            console.log('Error creating label');
            return []
        }
        return labels.id;
    } catch (error) {
        console.error(error)
        
    }
}

exports.checkIfLabelExists = async (auth, labelName) => {
    try {
        const gmail = google.gmail({ version: "v1", auth })

        const res = await gmail.users.labels.list({
            userId: 'me'
        })

        const labelList=res.data.labels;
        const userLabel=labelList.filter(label=>label.name===labelName);
        if(!userLabel || userLabel.length===0) return false
        return userLabel[0]


    } catch (error) {
        console.log(error);
        return null
    }
}