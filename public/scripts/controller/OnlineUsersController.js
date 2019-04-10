import OnlineUsersView from "../view/OnlineUsersView.js";
import User from "../model/User.js";

let user = new User("Liz");
let onlineUsers = new OnlineUsersView(user);

onlineUsers.displayOnlineUsers();