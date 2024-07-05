import axios from 'axios';
import { hostName, ContentTypeJSON, ContentTypeURL } from "./index";

let messagesArray = [];

// Создание сообщения
export async function createNewChatWithMessage(message) {
    try {
        const response = await axios.post(hostName + '/messages/create', {
            ...message
        }, {
            headers: {
            ...ContentTypeJSON,
            "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error(`api/massagesApi: createNewChatWithMessage => ${err}`)
    }
}

// Получение сообщений в чате
export async function getChatMessagesById(chat_id) {
    try {
       const response = await axios.get(hostName + `/messages/chat/${chat_id}`, {
        headers: {
            ...ContentTypeURL,
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    }); 
        createMessagesArray(response.data.data.messages)
        return messagesArray;
    } catch (error) {
        console.error(`api/messagesApi: getChatMessagesById => ${err}`)
    }
}
function createMessagesArray(arr) {
    arr.forEach((obj) => {
        messagesArray.push(obj.content)
    })
    return
}
