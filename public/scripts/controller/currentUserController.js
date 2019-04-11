function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function getCurrentUserId() {
    return getCookie("userid");
}

function getCurrentUserPromise() {
    firebase.auth().userId();
    let userData;
    let userInfo;
    const currentUserId = getCurrentUserId();
    promise = firebase.database().ref('users/' + currentUserId).once(
        function(snap) {
            userInfo = snap.val();
            userData = {
                userId: currentUserId,
                userName: userInfo.name,
                isOnline: true
            }
        }
    );
    return promise;
}