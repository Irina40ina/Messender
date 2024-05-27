import { hostName, headersJSON, headersUrl } from "@/api";
import axios from "axios";

export async function login(email, password) {
  try {
    const response = await axios.post(hostName + '/auth', {
        email,
        password,
    }, {
        headers: headersJSON,
    });
    console.log(response)

  } catch (err) {
    console.error(`api/authApi: login => ${err}`);
  }
}


