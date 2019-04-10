export class OnlineUsersView {
    constructor(userName) {
        this.userName = userName;
    }

    addUserToPanel(userName) {
        let usersContainer = document.getElementById("members");
        let userOnline = document.createElement("div");
        userOnline.setAttribute("class", "user-online");
        userOnline.textContent = userName;
        usersContainer.appendChild(userOnline);
    }
}