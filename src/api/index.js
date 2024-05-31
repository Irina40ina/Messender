
const hostName = "http://5.35.92.127:3333";
const headersJSON = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem('token')
};




const headersUrl = {
    "Content-Type": "application/x-www-form-urlencoded",
}



export {
    hostName,
    headersJSON,
    headersUrl,
}