import { io } from "socket.io-client";
import { useMainStore } from '@/store/mainStore';

function getUserData() {
    const token = localStorage.getItem('token');
    const userId = useMainStore().user?.id;
    if(!token || !userId) {
        throw 'getUserData() => Не удалось получить токен доступа либо ID пользователя при подключении сокета';
    } 
    return { token, userId }
}

export function initSocket() {
    try{
        const _configSocket = {
            auth: {
                access_token: null,
                user_id: null,
            },
            autoConnect: true,
        }
        const { token, userId } = getUserData();
        _configSocket.auth.access_token = token;
        _configSocket.auth.user_id = +userId;
        const socket = io("ws://5.35.92.127:3000", _configSocket);
        return socket;
    } catch(err) {
        console.error(`plugins/socket: initSocket => ${err}`);
        throw `plugins/socket: initSocket => ${err}`;
    }
}
