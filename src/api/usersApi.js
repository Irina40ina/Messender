import axios from 'axios';
import { hostName, headersJSON, headersUrl } from "./index";

// Получение пользователя по ID
export async function getUserById(userId) {
    try {
        const response = await axios.get(hostName + `/users/${userId}`, {
            headers: headersUrl,
        });
        console.log(response);
    } catch (err) {
        console.error(`api/usersApi: getUserById => ${err}`)
    }
}
