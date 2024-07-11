import { io } from "socket.io-client";
function initSocket() {
    try{
        const socket = io("ws://5.35.92.127:3000");
        return socket;
    } catch(err) {
        console.error(`plugins/socket: initSocket => ${err}`);
    }
}

export function globalSocketStarted() {
    try{
        const socket = initSocket();

// ===========================  Служебные события socket.io  =====================
        // Подключение по вебсокету
        socket.connect();

        socket.on('connect', () => {
            console.log('Подключение по ws успешно установлено');
        });

        socket.on('connect_error', (err) => {
            console.error('Не удалось подключиться к серверу', err);
        });

        socket.on('disconnect', () => {
            if (socket.active) {
                console.log('Клиент пытается переподключится');
            } else {
                // Если клиент отключился контролируемо, то отправляет об этом информацию другим сокетам в сети
                socket.emit('status:disconnect', { userId: socket.userID });
            }
        });

// ==============================  Серверные события  ==============================

        socket.on('status:disconnect', (data) => {
            const userId = data.userId;
        });

        // TEST
        socket.on('error', (err) => {
            console.log('socket:error', err);
        });

    } catch(err) {
        console.error(`plugins/socket: globalSocketStarted => ${err}`);
    }
}