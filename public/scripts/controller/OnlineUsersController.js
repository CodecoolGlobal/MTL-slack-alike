import OnlineUsersView from "../view/OnlineUsersView.js";
import {getCurrentUserPromise} from "./currentUserController.js";

getCurrentUserPromise().then(function (result) {
    let onlineUsers = new OnlineUsersView(result);
    onlineUsers.displayOnlineUsers();
});

