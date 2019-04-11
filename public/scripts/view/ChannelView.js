export default class ChannelView{
    constructor(user){
        this.user = user;
        this.registerChannelListeners();
        this.registerNewChannelButtonEvent();
    }

    /*
    ========================================
    Display Channels
    ========================================
    */
    registerChannelListeners(){
        return firebase.database().ref('channels/').on('value', function (snap) {
            this.clearChannels();
            this.displayChannels();
        }.bind(this))
    }

    displayChannels(){
        // this.clearChannels();
        return firebase.database().ref('channels/').once('value').then(function (snap) {
            // this.clearChannels();
            for (let key in snap.val()){
                let channel = snap.val()[key];
                this.displayOneChannel(channel);
        }}.bind(this));
    }

    displayOneChannel(channel){
        let listItem = document.createElement('li');
        let channelButton = document.createElement('div');

        listItem.classList.add('channel-display');

        channelButton.classList.add('channel-button');
        channelButton.innerText = channel.channelname;
        // channelButton.dataset.channelname = channel.channelname;
        // channelButton.dataset.ownerName = channel.owner;

        channelButton.onclick = function(){
            this.changeActiveChannelTo(channel.channelname);
            console.log('channel changed to ' + channel.channelname);
        }.bind(this);

        let deleteButton = document.createElement('span');
        deleteButton.classList.add('channel-delete');
        deleteButton.innerText = 'x';
        deleteButton.onclick = function(){
            this.deleteChannel(channel)
        }.bind(this);

        listItem.appendChild(channelButton);
        channelButton.appendChild(deleteButton);
        document.getElementById('channels-list').appendChild(listItem);
    }

    clearChannels(){
        let channelContainer = document.getElementById('channels-list');
        channelContainer.innerHTML = '';
    }

    /*
    ========================================
    Add Channel
    ========================================
    */

    addNewChannel(channelName){
        let newChannelData = {
            channelname: channelName,
            owner: this.user,
            messages: {}
        };
        return firebase.database().ref('channels/' + channelName).set(newChannelData);
    }

    registerNewChannelButtonEvent(){
        let button = document.getElementById('new-channel-button');

        button.onclick = function(){
            this.getNewChannelName().then(function (channelName) {
                if (channelName !== "") {this.addNewChannel(channelName, this.user)}
            }.bind(this))
        }.bind(this);
    }

    getNewChannelName() {
        let newName = prompt("Channel name:");
        return this.checkIfChannelNameIsDuplicate(newName).then(
            function (isDuplicate) {
                if (isDuplicate){
                    alert('This name already exists');
                    return "";
                } else {
                    return newName;
                }
            }
        )
    }

    checkIfChannelNameIsDuplicate(newName) {
        let allChannels = [];
        return firebase.database().ref('channels').once("value").then(function (snap) {
            for (let key in snap.val()){
                allChannels.push(snap.val()[key].channelname);
            }
            console.log(allChannels);
            return allChannels.includes(newName);
        });
    }

    /*
    ========================================
    Join Channel
    ========================================
    */

    changeActiveChannelTo(channelName){
        this.user.activeChannel = channelName;
        clearMessages();
        showMessagesInChannel(channelName);
    }


    /*
    ========================================
    Delete Channel
    ========================================
    */

    deleteChannel(channel) {
        console.log(channel);
        console.log(this.user.name);
        if (channel.owner.name === this.user.name) {
            return firebase.database().ref('channels/').child(channel.channelname).remove();
        } else {
            alert('Available only for channel creator')
        }
    }
}