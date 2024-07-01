import axios from 'axios';
import { hostName, ContentTypeJSON, ContentTypeURL } from "./index";

// Получение пользователя по ID
export async function getUserById(userId) {
    try {
        const response = await axios.get(hostName + `/users/${userId}`, {
            headers: {
                ...ContentTypeURL,
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        });
        console.log(response);
    } catch (err) {
        console.error(`api/usersApi: getUserById => ${err}`)
    }
}
 export async function getUsers(page) {
    // try {
       const obj = axios.get(hostName + '/users', {
        headers: {
            ...ContentTypeURL,
            "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        params: {
            page: page,
        }
    }); 
    let data = (await obj).data.data.users;
    let paginator = (await obj).data.meta.paginator;
    return { data, paginator };
    // } catch (error) {
    //     console.error(`api/usersApi: getUsers => ${err}`)
    // }
 }
//  this.page++
//  const { data: { meta: { paginator }, data } } = axios.get(hostName + '/users, { 
//      headers: {},  
//      params: {
//          page: this.page,
//          per_page: 15,
//      }
//  });
//  paginator; // { currentPage: 1, hasNext: true, hasPrev: false }
// */