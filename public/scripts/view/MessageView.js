export default class MessageView {

    constructor(user) {
        this.user = user;
        // this.channel = channel;

        this.loadEventListenerForTextarea();
        this.showMessagesInChannel();

    }

    addMessageToChannel(messageToAdd) {

        let channelName = this.user.getActiveChannel();
        let userName = this.user.getName();
        let timestamp = new Date();
        let messageData = {
            author: userName,
            time: timestamp.getHours() + ':' + this.addZero(timestamp.getMinutes()) + ', ' + timestamp.getUTCDate() + '.'
                + this.addZero((timestamp.getUTCMonth() + 1)) + '.' + timestamp.getFullYear(),
            message: messageToAdd,
        };
        let newMessageKey = firebase.database().ref('channels/' + channelName + '/messages/').push().key;
        let newUpdate = {};
        newUpdate[newMessageKey] = messageData;

        return firebase.database().ref('channels/' + channelName + '/messages/').update(newUpdate);
    }

    addZero(number) {
        if(number < 10) {
            return '0' + number;
        }
        return number;
    }


    showMessagesInChannel() {
        let channelName = this.user.getActiveChannel();
        let channelRef = firebase.database().ref('channels/' + channelName + '/messages');

        channelRef.on("value", function (data) {
            this.clearMessages();
            data.forEach(function (data) {
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
                userName.setAttribute('class', 'user-name');
                userName.textContent = message.author;
                userNameAndTime.appendChild(userName);

                let userMessageTime = document.createElement('p');
                userMessageTime.setAttribute('class', 'user-time');
                userMessageTime.textContent = message.time;


                userNameAndTime.appendChild(userMessageTime);
                let userMessage = document.createElement('div');
                newMessage.appendChild(userMessage);

                let messageContent = document.createElement('p');
                messageContainer.setAttribute('class', 'user-message');
                messageContent.textContent = message.message;
                userMessage.appendChild(messageContent);
            });
            this.scrollOutflow();
        }.bind(this));
    }


    clearMessages() {
        let allMessagesContainer = document.getElementById('message-history');
        allMessagesContainer.innerHTML = '';

    }


    loadEventListenerForTextarea() {
        let inputMessage = document.getElementById('primary-text-area');
        inputMessage.addEventListener("keypress", function (k) {
            this.keyPressed(k);
        }.bind(this));
    }

    keyPressed(k) {
        if (k.keyCode == 13) {
            k.preventDefault();
            let inputMessage = document.getElementById('primary-text-area').value;
            if (inputMessage.trim().length) {
                this.addMessageToChannel(inputMessage).then(function () {
                });
                document.getElementById('primary-text-area').value = "";
            }

        }
    }

    scrollOutflow() {
        let messages = document.getElementById("message-history");
        messages.scrollTop = messages.scrollHeight;
        console.log("I scrolled!");
    }

}