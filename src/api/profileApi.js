import axios from 'axios';
import { hostName, headersJSON, headersUrl } from "./index";
import { useMainStore } from '@/store/mainStore';


// Получение профиля пользователя
export async function getProfile() {
    try {
        const response = await axios.get(hostName + '/profile/me', {
            headers: headersUrl,
        });
        console.log(response);
    } catch(err) {
        console.error(`api/profileApi: getProfile => ${err}`);
    }
}



export async function multipleProfileUpdate() {
    const store = useMainStore();
    try {
        const readyData = store.excludeNullableFields(store.profileEditData);
        console.log(readyData)
        const response = await axios.put(hostName + `/profile/1/update`, {
            ...readyData
        }, {
            headers: headersJSON,
        });
        console.log(response);
    } catch(err) {
        console.error(`api/profileApi: multipleProfileUpdate => ${err}`);
    }
} 

export async function singleProfileUpdate() {
    const store = useMainStore();
    try {
        const readyData = store.excludeNullableFields(store.profileEditData);
        
        const response = await axios.patch(hostName + `/profile/1/update-one`, {
            ...readyData
        }, {
            headers: headersJSON,
        });
        console.log(response);
    } catch(err) {
        console.error(`api/profileApi: singleProfileUpdate => ${err}`);
    }
}