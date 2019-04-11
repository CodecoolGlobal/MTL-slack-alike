//delete it later
$( document ).ready(function() {
    // addMassagesOnPage('running');
    showMessagesInChannel('running');
    loadEventListenerForTextarea();
});


function addMessageToChannel(channelName, userName, messageToAdd){

    let timestamp = new Date();
    let messageData = {
        author: userName,
        time: timestamp.getHours() + ':' + timestamp.getMinutes() + ', ' + timestamp.getUTCDate() + '.0'
            + (timestamp.getUTCMonth() + 1) + '.' + timestamp.getFullYear(),
        message: messageToAdd,
    };
    let newMessageKey = firebase.database().ref('channels/' + channelName + '/messages/').push().key;
    let newUpdate = {};
    newUpdate[newMessageKey] = messageData;

    return firebase.database().ref('channels/' + channelName + '/messages/').update(newUpdate);
}


//delete it later
function displayAllTheMessages() {
    let dbRef = firebase.database().ref();

    dbRef.on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function (error) {
        console.log("Error: " + error.code);
    });
}

//delete it later
function getContentOfChannel(channelName) {
    let channelRef = firebase.database().ref('channels/' + channelName);

    channelRef.on("value", function(data) {
        data.forEach(function(data) {
            console.log(data.val());
        });
    });

}

//delete it later
function addMassagesOnPage(channelName) {
    let channelRef = firebase.database().ref('channels/' + channelName + '/messages');

    channelRef.on("value", function(data) {
        data.forEach(function(data) {
            let message = data.val();
            let messageContainer = document.getElementById('message-history');
            let newMessage = document.createElement('p');
            newMessage.textContent = message.message;
            newMessage.setAttribute('class', 'message');
            messageContainer.appendChild(newMessage);
        });
    });

}

function showMessagesInChannel(channelName) {
    let channelRef = firebase.database().ref('channels/' + channelName + '/messages');

    channelRef.on("value", function(data) {
        data.forEach(function(data) {
            let message = data.val();
            let messageContainer = document.getElementById('message-history');

            let newMessage = document.createElement('div');
            // newMessage.className = 'message';
            newMessage.setAttribute('class', 'message');
            messageContainer.appendChild(newMessage);


            let userNameAndTime = document.createElement('div');
            userNameAndTime.setAttribute('class', 'flex-container-name-time');

            newMessage.appendChild(userNameAndTime);

            let userName = document.createElement('p');
            userName.textContent = message.author;
            userNameAndTime.appendChild(userName);

            let userMessageTime = document.createElement('p');
            userMessageTime.textContent = message.time;


            userNameAndTime.appendChild(userMessageTime);
            let userMessage = document.createElement('div');
            newMessage.appendChild(userMessage);

            let messageContent = document.createElement('p');
            messageContent.textContent = message.message;
            userMessage.appendChild(messageContent);
        });
    });
}

function clearMessages() {
    let allMessagesContainer = document.getElementById('message-history');
    allMessagesContainer.innerHTML = '';

}

function loadEventListenerForTextarea() {
    let inputMessage = document.getElementById('primary-text-area');
    inputMessage.addEventListener("keypress", keyPressed);
}

function keyPressed(k) {
    if (k.keyCode == 13) {
        let inputMessage = document.getElementById('primary-text-area').value;
        addMessageToChannel('running', 'Marek', inputMessage);
        document.getElementById('primary-text-area').value = "";
    }
}