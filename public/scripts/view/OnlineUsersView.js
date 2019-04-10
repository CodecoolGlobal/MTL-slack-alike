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

export class OnlineUsersView {
    constructor(userName) {
        this.userName = userName;
    }

    getOnlineUsers() {

    }

    // addUserToPanel(userName) {
    //     let usersContainer = document.getElementById("members");
    //     let userOnline = document.createElement("div");
    //     userOnline.setAttribute("class", "user-online");
    //     userOnline.textContent = userName;
    //     usersContainer.appendChild(userOnline);
    // }
}

