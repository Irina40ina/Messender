import { hostName, headersJSON, headersUrl } from "@/api";
import axios from "axios";
import { useMainStore } from "@/store/mainStore"

// Войти в систему
export async function login(email, password) {
  try {
    const response = await axios.post(hostName + '/auth', {
        email,
        password,
    }, {
        headers: headersJSON,
    });
    const responseObj = {
      user: response.data.data.user,
      token: response.data.data.access_token.token,
    };
    localStorage.setItem('token', responseObj.token);
    const store = useMainStore();
    store.isAuth = true;
    return responseObj;

  } catch (err) {
    console.error(`api/authApi: login => ${err}`);
  }
}
export async function logup(firstName, lastName, email, password) {
  try {
    const response = await axios.post(hostName + '/users/create', {
        email,
        password,
        name: firstName,
        lastname: lastName,
    }, {
        headers: headersJSON,
    });
    console.log(response)

  } catch (err) {
    console.error(`api/authApi: logup => ${err}`);
  }
}
