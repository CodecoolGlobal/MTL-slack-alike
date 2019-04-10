//
// const config = {
//     apiKey: "AIzaSyD9A0VUu5HP-VcJW2qUtdUt7p3s-JH-8cI",
//     authDomain: "mtl-chat.firebaseapp.com",
//     databaseURL: "https://mtl-chat.firebaseio.com",
//     projectId: "mtl-chat",
//     storageBucket: "mtl-chat.appspot.com",
//     messagingSenderId: "718509635861"
// };
// firebase.initializeApp(config);

//delete it later
$( document ).ready(function() {
    // addMassagesOnPage('running');
    showMessagesInChannel('running')
});

// $( window ).on( "load", function() {});


function addMessageToChannel(channelName, userName, messageToAdd){

    let timestamp = new Date();
    let messageData = {
        author: userName,
        timestamp: timestamp.getHours() + ':' + timestamp.getMinutes() + timestamp.getDate(),
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
            userMessageTime.textContent = message.timestamp;


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