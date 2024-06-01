import axios from 'axios';
import { hostName, headersJSON, headersUrl } from "./index";

// Получение профиля пользователя
export async function getProfile() {
    try {
        const response = await axios.get(hostName + '/profile/me', {
            headers: headersUrl,
        })
        console.log(response);
    } catch(err) {
        console.error(`api/profileApi: getProfile => ${err}`)
    }
}
