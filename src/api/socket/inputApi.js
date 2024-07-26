import { initSocket } from '@/plugins/socket'
import { useMainStore } from '@/store/mainStore';

// ===========================  Служебные события socket.io  =====================
export function entrySocketStarted() {
    try{
        const socket = initSocket();
        socket.connect();  // Подключение по вебсокету

        // Проверка установки socket соединения по событию "connect" 
        socket.on('connect', () => {
            console.log('Подключение по ws успешно установлено');
        });

        // В случае ошибки при установке соединения  
        socket.on('connect_error', (err) => {
            console.error('Не удалось подключиться к серверу', err);
        });

        // В случае разъединения соединения с сервером
        socket.on('disconnect', () => {
            if (socket.active) {
                console.log('Клиент пытается переподключится');
            } else {
                // Если клиент отключился контролируемо, то отправляет об этом информацию другим сокетам в сети
                socket.emit('status:disconnect', { userId: socket.userID });
            }
        });

        // TEST (хз)
        socket.on('error', (err) => {
            console.log('socket:error', err);
        });
        usersSocketStarted(socket);
        messagesSocketStarted(socket);
        chatsSocketStarted(socket);
 
    } catch(err) {
        console.error(`api/socket/inputApi: entrySocketStarted => ${err}`);
    }
}

// ==============================  Серверные события Пользователей  ==============================
function usersSocketStarted(socket) {
    try {
        // получение информации от сервера об отсоединенном сокет-клиенте
        socket.on('status:disconnect', (data) => {
            const userId = data.userId;
        });
    } catch (err) {
        console.error(`api/socket/inputApi: usersSocketStarted => ${err}`);
    }
}

// ==============================  Серверные события Сообщенеий  ==============================
function messagesSocketStarted(socket) {
    try {
        // Приниять новое сообщение
        socket.on('message:create', (message) => {
            const store = useMainStore();
            console.log('Вы получили новое сообщение', message);
            store.messages.push(message);
            // const message = message;
        });
        // Принять обновленное сообщение
        socket.on('message:update', (message) => {
            // const message = message;
            const store = useMainStore();
            store.editSelectedMessageView(message.id, message);
            
        });
        // Принять ID удаляенного сообщения
        socket.on('message:delete', (messageId) => {
            // const messageId = messageId;
        });
        
    } catch (err) {
        console.error(`api/socket/inputApi: messagesSocketStarted => ${err}`);
    }
}

// ==============================  Серверные события Чатов  ==============================
function chatsSocketStarted(socket) {
    try {
        // Приниять новый чат
        socket.on('chat:create', (message) => {
            // const message = message;
        });
    } catch (err) {
        console.error(`api/socket/inputApi: chatsSocketStarted => ${err}`);
    }
}