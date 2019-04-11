const config = {
    apiKey: "AIzaSyD9A0VUu5HP-VcJW2qUtdUt7p3s-JH-8cI",
    authDomain: "mtl-chat.firebaseapp.com",
    databaseURL: "https://mtl-chat.firebaseio.com",
    projectId: "mtl-chat",
    storageBucket: "mtl-chat.appspot.com",
    messagingSenderId: "718509635861"
};
firebase.initializeApp(config);

class User {
    constructor(user) {
        this.name = user.displayName;
        this.id = user.uid;
        this.isOnline = false;
    }
}

function setUserIdCookie(userId) {
    let date = new Date();
    const howManyDaysToExpire = 1;
    date.setTime(date.getTime() + (howManyDaysToExpire*24*60*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = "userid" + "=" + userId + ";" + expires + ";path=/";
}

function addUserToDb(user) {
    return firebase.database().ref('users/'+user.id).set(
        {
            name: user.name,
            isOnline: true
        }
    )
}


function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("It works");
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.uid);
        const userToAdd = {
            name: user.displayName,
            id: user.uid,
            isOnline: true
        };
        setUserIdCookie(user.uid);
        addUserToDb(userToAdd).then(
            function changePage() {
                window.location = 'application.html';
            }
        );
        //;
        // ...
    }).catch(function(error) {
        console.log("It doesnt work");
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
