import axios from 'axios';
import { hostName, ContentTypeJSON, ContentTypeURL, getBearerToken } from "./index";

// Получение пользователя по ID
export async function getUserById(userId) {
    try {
        const response = await axios.get(hostName + `/users/${userId}`, {
            headers: {
                ...ContentTypeURL,
                ...getBearerToken(),
            }
        });
        console.log(response);
    } catch (err) {
        console.error(`api/usersApi: getUserById => ${err}`)
    }
}
