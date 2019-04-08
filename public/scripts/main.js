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
        time: timestamp,
        message: messageToAdd
    };

    let newMessageKey = firebase.database().ref('channels/' + channelName + '/messages/').push().key;

    let newUpdate = {};
    newUpdate[newMessageKey] = messageData;

    return firebase.database().ref('channels/' + channelName + '/messages/').update(newUpdate);

}


// addUserNameToDB("Tatiana");
// addChannelToDB('animals');
addMessageToChannel('animals', 'Marek', 'i love lions too!');