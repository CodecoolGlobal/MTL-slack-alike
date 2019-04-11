export default class OnlineUsersView {
    constructor(userName) {
        this.userName = userName;
    }

    displayOnlineUsers() {
        let membersOnline = document.getElementById("members-list");
        let users = firebase.database().ref("users/");
        let userName;

        users.on("value", function (data) {
            this.clearMembers();
            data.forEach(function (data) {
                userName = document.createElement("li");
                userName.setAttribute("class", "online");
                userName.textContent = data.val().name;
                membersOnline.appendChild(userName);
            });
        }.bind(this));
    }

    clearMembers(){
        document.getElementById('members-list').innerHTML = '';
    }


}