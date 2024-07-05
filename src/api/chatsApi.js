import axios from 'axios';
import { hostName, ContentTypeJSON, ContentTypeURL } from "./index";

let resultArray = [];

// Получение всех чатов
export async function getChats(page, perPage) {
    try {
       const obj = await axios.get(hostName + '/chats', {
        headers: {
            ...ContentTypeURL,
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        params: {
            page: page,
            per_page: perPage,
        }
    }); 
    let data = obj.data.data;
    let paginator = obj.data.meta.paginator;
    createResultArray(data);
    return { resultArray, paginator };
    } catch (error) {
        console.error(`api/chatsApi: getChats => ${err}`)
    }
}

function createResultArray(array) {
    array.forEach((elem)=> {
        resultArray.push(elem.users[0])
        return
    })
}

// Получение чата по Id
// export async function getChatById(id) {
//     try {
//        const response = await axios.get(hostName + `/chats/${id}`, {
//         headers: {
//             ...ContentTypeURL,
//             "Authorization": "Bearer " + localStorage.getItem('token'),
//         },
//     }); 
//         return response.data.data;
//     } catch (error) {
//         console.error(`api/chatsApi: getChatsById => ${err}`)
//     }
// }

// Создание нового чата
export async function createNewChat(chatObj) {
    try {
        const response = await axios.post(hostName + '/chats/create', {
            ...chatObj
        }, {
            headers: {
            ...ContentTypeJSON,
            "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error(`api/chatsApi: createNewChat => ${err}`)
    }
}
