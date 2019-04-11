import ChannelView from "../view/ChannelView.js";
import {getCurrentUserPromise} from "./currentUserController.js";

getCurrentUserPromise().then(function (result) {

    let channelView = new ChannelView(result);
    console.log(channelView.user.id);
    console.log(channelView.user.name);

    firebase.database().ref('users/' + channelView.user.id).update(
        {
            isOnline: true
        }
    );

    // onDisconnect

    let amOnline = firebase.database().ref('.info/connected');
    let userRef = firebase.database().ref('users/' + channelView.user.id);
    amOnline.on('value', function(snapshot) {
        let newStatus = {
            isOnline: false
        };
        // newStatus['isOnline'] = false;
        if (snapshot.val()) {
            userRef.onDisconnect().update(newStatus);
        }
    });
});
