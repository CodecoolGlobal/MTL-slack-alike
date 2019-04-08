function addUserNameToDB(userName){
    return firebase.database().ref('users/' + userName).set({
        username: userName
    })
}

function addChannelToDB(channelName) {
    let newChannelData = {
        channelname: channelName,
        messages: {}
    };

    return firebase.database().ref('channels/' + channelName).set(newChannelData);
}

function addMessageToChannel(channelName, userName, messageToAdd){

        let timestamp = new Date();

        let messageData = {
            author: userName,
            timestamp: timestamp.getHours() + ':' + timestamp.getMinutes(),
            message: messageToAdd,
        };

        let newMessageKey = firebase.database().ref('channels/' + channelName + '/messages/').push().key;

        let newUpdate = {};
        newUpdate[newMessageKey] = messageData;

        return firebase.database().ref('channels/' + channelName + '/messages/').update(newUpdate);
}

function addNewMessageHandler(channelName){
    firebase.database().ref('channels/' + channelName + '/messages/').on('child_added', function (newMessage) {
        return displayLastMessage(newMessage);
    })
}

function displayLastMessage(message){
        console.log(message.val().message);
        console.log(message.val().author);
        console.log(message.val().timestamp);
        console.log(message.val());
}


// addUserNameToDB("Tatiana");
addChannelToDB('weather');
console.log('channel added');
addNewMessageHandler('weather');
console.log('handler added');
addMessageToChannel('weather', 'Liz', 'i love sun!');
console.log('final message');
