import MessageView from "../view/MessageView.js";
import Channel from "../model/Channel.js";
import User from "../model/User.js";


let user = new User("Tatiana");
// let channel = new Channel('running', "");
let newMessageView = new MessageView(user.getName());
