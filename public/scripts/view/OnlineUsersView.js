export default class OnlineUsersView {
    constructor(userName) {
        this.userName = userName;
    }

    displayOnlineUsers() {
        let membersOnline = document.getElementById("members");
        let users = firebase.database().ref("users/");
        let userName;

        users.on("value", function (data) {
            data.forEach(function (data) {
                userName = document.createElement("p");
                userName.setAttribute("class", "online");
                userName.textContent = data.val().name;
                membersOnline.appendChild(userName);
            });
        });
    }
}