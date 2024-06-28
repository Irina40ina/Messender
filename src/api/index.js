
// const hostName = "http://localhost:3333";
const hostName = "http://5.35.92.127:3333";

let ContentTypeURL = {
    "Content-Type": "application/x-www-form-urlencoded",
}
let ContentTypeJSON = {
    "Content-Type": "application/json",
}

function getBearerToken() {
    const token = localStorage.getItem('token');
    return {
        "Bearer": token,
    }
}

export {
    hostName,
    ContentTypeURL,
    ContentTypeJSON,
    getBearerToken,
}
