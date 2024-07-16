import axios from 'axios';
import { hostName, ContentTypeJSON, ContentTypeURL } from "./index";

// Получение пользователя по ID
export async function getUserById(userId) {
    try {
        const response = await axios.get(hostName + `/users/${userId}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        });
        return response.data;
    } catch (err) {
        console.error(`api/usersApi: getUserById => ${err}`)
    }
}

// Получение данных пользователя по токену доступа
export async function getUserDataMe() {
    try {
        const response = await axios.get(hostName + `/users/me`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        });
        return response.data.data;
    } catch (err) {
        console.error(`api/usersApi: getUserDataMe => ${err}`)
    }
}


export async function getUsers(page, perPage) {
    try {
       const obj = await axios.get(hostName + '/users', {
        headers: {
            ...ContentTypeURL,
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        params: {
            page: page,
            per_page: perPage,
        }
    }); 
    let data = obj.data.data.users;
    let paginator = obj.data.meta.paginator;
    return { data, paginator };
    } catch (error) {
        console.error(`api/usersApi: getUsers => ${err}`)
    }
}