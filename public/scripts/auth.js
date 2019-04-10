
const config = {
    apiKey: "AIzaSyD9A0VUu5HP-VcJW2qUtdUt7p3s-JH-8cI",
    authDomain: "mtl-chat.firebaseapp.com",
    databaseURL: "https://mtl-chat.firebaseio.com",
    projectId: "mtl-chat",
    storageBucket: "mtl-chat.appspot.com",
    messagingSenderId: "718509635861"
};
firebase.initializeApp(config);

function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("It works")
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        console.log("It doesnt work")
        console.log(error)
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
