import axios from 'axios';
import { hostName, ContentTypeJSON, ContentTypeURL } from "./index";


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
export async function getChatMessagesById(chat_id, page, perPage) {
    try {
       const response = await axios.get(hostName + `/messages/chat/${chat_id}`, {
        params: {
            page: page,
            per_page: perPage,
        },
        headers: {
            ...ContentTypeURL,
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
    }); 
        const { data: { data: { messages }, meta: { paginator } } } = response;
        return { messages, paginator };
    } catch (error) {
        console.error(`api/messagesApi: getChatMessagesById => ${err}`)
    }
}
