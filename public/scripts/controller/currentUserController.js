import User from "../model/User.js";

function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function getCurrentUserId() {
    return getCookie("userid");
}

export function getCurrentUserPromise() {
    let userInfo;
    const currentUserId = getCurrentUserId();
    let promise = firebase.database().ref('users/' + currentUserId).once('value').then(
        function(snap) {
            userInfo = snap.val();
            let newUser = new User(userInfo.name, currentUserId);

            return newUser;
        }
    );
    return promise;
}