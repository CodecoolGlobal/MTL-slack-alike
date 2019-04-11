import ChannelView from "../view/ChannelView.js";
import {getCurrentUserPromise} from "./currentUserController.js";

getCurrentUserPromise().then(function (result) {

    let channelView = new ChannelView(result);
    console.log(channelView.user.id);
    console.log(channelView.user.name);

    // onDisconnect

    let amOnline = firebase.database().ref('.info/connected');
    let userRef = firebase.database().ref('users/' + channelView.user.id);
    amOnline.on('value', function(snapshot) {
        if (snapshot.val()) {
            userRef.onDisconnect().remove();
        }
    });
});
