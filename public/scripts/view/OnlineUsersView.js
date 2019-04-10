// Initialize Firebase
const config = {
    apiKey: "AIzaSyD9A0VUu5HP-VcJW2qUtdUt7p3s-JH-8cI",
    authDomain: "mtl-chat.firebaseapp.com",
    databaseURL: "https://mtl-chat.firebaseio.com",
    projectId: "mtl-chat",
    storageBucket: "mtl-chat.appspot.com",
    messagingSenderId: "718509635861"
};
firebase.initializeApp(config);

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