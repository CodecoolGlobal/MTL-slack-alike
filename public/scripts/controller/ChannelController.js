import ChannelView from "../view/ChannelView.js";
import {getCurrentUserPromise} from "./currentUserController.js";

getCurrentUserPromise().then(function (result) {

    let channelView = new ChannelView(result);
    console.log(channelView.user.id);
    console.log(channelView.user.name);
});
