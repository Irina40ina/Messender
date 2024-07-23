<template>
    <div class="message-widget" ref="messageWidget">
        <!-------------- LOADING ---------------->
        <div 
        class="loading-overlay"
        v-show="isShowLoadingData"
        >
            <font-awesome-icon class="icon" :icon="['fas', 'spinner']" />
        </div>
        <contextMenuComp
        :is-show="isShowContextMenu"
        @close="isShowContextMenu = false"
        @show-replyed-message="replyMessage"
        @edit-message="editSelectedMessage"
        @select-messages="handlerSelectMessage"
        />
        <!-- Блок с уведомлением -->
        <div 
        class="notice-container"
        v-show="isShowNotice"
        >
            <h1 class="notice-text">Выберите чат для общения</h1>
            <font-awesome-icon class="notice-icon" icon="fa-solid fa-comment" />
        </div>
        <!-- Header -->
        <div 
        class="message-header"
        v-show="isShowChat"
        >
            <div class="message-user__avatar">
                <p class="avatar-stub">{{ toUserInitials }}</p>
            </div> 
            <div class="message__users-name-container">
                <p class="users__name">{{ toUserName }}</p>
            </div>
        </div>

        <!-- Content -->
        <div 
        class="message-content"
        ref="scrollContainer"
        >
            <wraperMessageComp
            @open-context-menu="(e) => openContextMenu(e)"
            v-show="isShowChat"
            v-for="message in store.messages" 
            :message="message"
            :key="message.id"
            :is-selected="computeSelectedMessage(message.id)"
            ></wraperMessageComp>
        </div>
        <div 
        class="replyed-message-panel"
        v-show="isShowReplyedMessage"
        >
            <font-awesome-icon  class="icon-reply" :icon="['fas', 'reply']" />
            <div class="replyed-message-container">
                <p class="replyed-message-text">Ответ на сообщение: {{ selectedMessage?.content }}</p>
            </div>
        </div>

        <!-- Input Panel -->
        <div class="input-message-panel">
            <textarea 
                v-show="isShowChat"
                name="input-message"
                id="input-message" 
                placeholder="Введите сообщение"
                @input="(e) => messageObj.content = e.target.value"
                :value="messageObj.content"
            ></textarea>
            <font-awesome-icon 
            class="btn-send-message" 
            v-show="isShowChat"
            :icon="['fas', 'paper-plane']" 
            @click="sendMessage"
            />
        </div>
    </div>
</template>

<script>
import wraperMessageComp from './wraperMessageComp.vue';
import { editMessage, getChatMessagesById } from '@/api/messagesApi';
import { useMainStore } from '@/store/mainStore';
import { nextTick, watch } from 'vue';
import { getChatById } from '@/api/chatsApi';
import { getUserById } from '@/api/usersApi';
import { createMessage } from '@/api/messagesApi';
import contextMenuComp from '@/components/mainView/messanger/contextMenuComp.vue';
export default {
    components: {
        wraperMessageComp,
        contextMenuComp,
    },
    data() {
        return {
            store: useMainStore(),
            messageObj: {
                from_user_id: null,
                to_user_id: null,
                chat_id: null,
                content: '',
                forwarded_ids: null,
            },
            isShowContextMenu: false,
            isShowReplyedMessage: false,
            // arrMessages: [],
            isShowNotice: true,
            isShowChat: false,
            isShowLoadingData: false,
            chatId: null,
            paginator: null,
            page: 1,
            perPage: 20,
            toUserId: null,
            toUserName: '',
            toUserInitials: '',
            selectedMessage: null,
            editMode: false,
            opennedChat: null,
            selectedMessagesId: [],
        }
    },
    props: {
        opennedChat: {
            type: Object,
            required: false,
            default: null,
        }
    },
    methods: {
        async renderChat(id) {
            this.$router.push({ name: 'chat', params: { chatId: id } });
        },
        async handlerGetMessages(chatId) {
            try {
                this.isShowLoadingData = true;
                const response = await getChatMessagesById(chatId, this.page, this.perPage);
                this.store.messages = response.messages;
                this.paginator = response.paginator;
                this.isShowChat = true;
                this.isShowNotice = false;
            } catch (err) {
                console.error(err);
            } finally {
                this.isShowLoadingData = false;
            }
        },

        createMessageObj(fromId, toId, chatId) {
            this.messageObj.from_user_id = fromId;
            this.messageObj.to_user_id = toId;
            this.messageObj.chat_id = chatId;
        },
        async scrolling() {
            const targetElement = this.$refs.scrollContainer;
            await nextTick(); 
            targetElement.scroll({
                top: targetElement.scrollHeight,
                behavior: "smooth",
            });
        },
        async sendMessage() {
            // Создание сообщения
            try {
                if (this.messageObj.content !== '' && this.editMode === false) {
                    let currentChat = this.$props.opennedChat ?? this.opennedChat
                    this.createMessageObj(this.store.user?.id, currentChat.users[0].id, currentChat.id);
                    const data = await createMessage(this.messageObj);
                    this.store.messages.push(data?.data);
                    this.scrolling();
                }
                // Редактирование
                else if (this.messageObj.content !== '' && this.editMode === true) {
                    const response = await editMessage(this.selectedMessage.id, this.messageObj.content);
                    this.store.editSelectedMessageView(response.id, response);
                }
                this.messageObj.from_user_id = null;
                this.messageObj.to_user_id = null;
                this.messageObj.chat_id = null;
                this.messageObj.content = '';
            } catch (err) {
                console.error('ошибка при отправке сообщения (sendMessage)', err);
            }
        },
        openContextMenu(message) {
            this.isShowContextMenu = true;
            this.selectedMessage = message;
        },
        replyMessage() {
            this.isShowReplyedMessage = true;
        },
        editSelectedMessage() {
            if (this.selectedMessage) {
                this.messageObj.content = this.selectedMessage.content;
                this.editMode = true;
            } else {
                console.error('this.selectedMessage === null');
            }
        },
        handlerSelectMessage() {
            this.selectedMessagesId.push(this.selectedMessage.id);
            console.log(this.selectedMessagesId)
        }
    },
    computed: {
        computeSelectedMessage() {
            return (messageId) => {
                if(this.selectedMessagesId.includes(messageId)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    created() {
        watch(() => this.$props.opennedChat, async (newValue) => {
            if(newValue) {
                await this.handlerGetMessages(newValue.id);
                this.renderChat(newValue.id);
                this.toUserName = newValue.users[0].name;
                this.toUserLastname = newValue.users[0].lastname;
            }
        }, { deep: true });
        watch(() => this.store.chats.length, async (newValue, oldValue) => {
            if(oldValue === 0 && newValue > 0 && this.$route.params.chatId !== undefined) {
                const { userName, userLastname, chat } = this.store.extractUsernameByChatId(this.$route.params.chatId);
                this.opennedChat = chat;
                this.toUserName = userName + ' ' + userLastname;
                this.toUserInitials = userName.slice(0,1).toUpperCase() + userLastname.slice(0,1).toUpperCase();
            }
        }, { deep: false });
    },
    async mounted() {
        try {
            if(this.$route.params.chatId !== undefined) {
                await this.handlerGetMessages(this.$route.params.chatId);
                this.scrolling();
                // const { userName, userLastname } = await this.store.extractUsernameByChatId(this.$route.params.chatId)
                // this.toUserName = userName + ' ' + userLastname;
                // this.toUserInitials = userName.slice(0,1).toUpperCase() + userLastname.slice(0,1).toUpperCase();
            } 
        } catch (err) {
            console.error(err)
        }

        // Обработчик нажатия кнопок (Enter)
        const textarea = document.getElementById('input-message');
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if(this.messageObj.content != ''){
                    this.sendMessage();
                }
            }
        })
        // Обработчик нажатия кнопок (Escape)
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && this.$route.name === 'chat') {
                this.$router.push({name: 'messanger'});
                this.$route.params.chatId = undefined;
                this.isShowNotice = true;
                this.isShowChat = false;                                                                                                   
                this.isShowReplyedMessage = false;
            }
        })
    }
}

</script>

<style scoped>
    .message-widget {
        width: 80%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #9fce9f;
    }
    @keyframes rotate-circle {
        100% {
            transform: rotate(360deg);
        }
    }

    .loading-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.1);
        backdrop-filter: blur(3px);
        z-index: 5;
    }
    .icon {
        color: #a0e0a0;
        font-size: 3.25rem;
        animation-name: rotate-circle;
        animation-duration: .8s;
        animation-iteration-count: infinite;
    }
    .notice-container {
        position: absolute;
        top: 42%;
        left: 11%;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .notice-text {
        text-align: center;
        font-family: var(--font);
        color: var(--color-fg-main);
    }
    .notice-icon {
        width: 40px;
        height: 100px;
        color: rgb(61, 118, 61);
        padding: 1.5rem;
    }
    .message-header {
        width: 100%;
        height: 5%;
        background-color: var(--color-bg-main);
        display: flex;
        align-items: center;
        padding: .3rem 2rem;
        border-bottom: 1px solid var(--primary-fg-light);
    }
    
    .message-user__avatar {
        left: 5%;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .5rem;
    }
    .avatar-stub {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        font-family: var(--font);
        font-weight: bolder;
    }
    .message__users-name-container {
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        position: relative;
    }
    .users__name {
        font-size: 16px;
        font-family: var(--font);
    }
    .message-content {
        position: relative;
        width: 100%;
        height: 80%;
        overflow: auto;
    }
    .replyed-message-panel {
        width: 90%;
        height: 40px;
        border-radius: 10px;
        border: 2px solid var(--violet);
        background-color: #fff;
        position: absolute;
        bottom: 20%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0.1rem;
        z-index: 900;
    }
    .icon-reply {
        color: var(--violet);
        width: 5%;
        height: 30px;
    }
    .replyed-message-container {
        width: 90%;
    }
    .replyed-message-text {
        font-family: var(--font);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .input-message-panel {
        min-height: 15%;
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    #input-message {
        width: 90%;
        height: 90%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: -10px -6px 10px -3px rgba(81,  115,  81, 0.5);
        outline: rgba(255, 255, 255, 0);
        resize: none;
        padding: 0.5rem 4rem 0.5rem 1rem;
        box-shadow: var(--shadow);
    }
    .btn-send-message {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 6%;
        bottom: 18%;
        color: var(--primary-fg);
        padding: .2rem;
        border-radius: var(--radius);
        transition: all 0.3s ease;
    }
    .btn-send-message:hover {
        transition: all 0.3s ease;
        background-color: rgba(128, 128, 128, 0.13);
    }
</style>