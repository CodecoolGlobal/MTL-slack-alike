export default class ChannelView{
    constructor(){
        this.registerChannelListeners();
        this.registerNewChannelButtonEvent();
    }

    displayChannels(){
        this.clearChannels();
        return firebase.database().ref('channels/').once('value').then(function (snap) {
            this.clearChannels();
            for (let key in snap.val()){
                let channel = snap.val()[key];
                this.displayOneChannel(channel);
        }}.bind(this));
    }

    registerChannelListeners(){
        return firebase.database().ref('channels/').on('value', function (snap) {
            this.clearChannels();
            this.displayChannels();
        }.bind(this))
    }

    displayOneChannel(channel){
        let channelButton = document.createElement('div');
        channelButton.classList.add('channel-display');
        channelButton.innerText = channel.channelname;
        channelButton.dataset.channelname = channel.channelname;
        channelButton.dataset.owner = channel.owner;
        document.getElementById('channels').appendChild(channelButton);
    }

    addNewChannel(channelName, owner){
        let newChannelData = {
            channelname: channelName,
            owner: owner,
            messages: {}
        };
        return firebase.database().ref('channels/' + channelName).set(newChannelData);
    }

    clearChannels(){

        let channelContainer = document.getElementsByClassName('channel-display');
        for (let channel of channelContainer){
            console.log(channel);
            channel.parentNode.removeChild(channel);
        }
        return

    }

    registerNewChannelButtonEvent(){
        let button = document.getElementById('new-channel-button');
        let userName = 'Marek';
        let channelName = 'music';

        button.onclick = function(){this.addNewChannel(channelName, userName)}.bind(this);
        // button.addEventListener('click', this.addNewChannel(channelName, userName));
    }
}