<template>
    <div class="message-widget">
        <contextMenuComp
        :is-show="isShowContextMenu"
        @close="isShowContextMenu = false"
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
                <p class="avatar-stub">{{ toUserName.slice(0,1).toUpperCase() + toUserLastname.slice(0,1).toUpperCase() }}</p>
            </div> 
            <div class="message__users-name-container">
                <p class="users__name">{{ toUserName + ' ' + toUserLastname }}</p>
            </div>
        </div>

        <!-- Content -->
        <div class="message-content">
            <wraperMessageComp
            @open-context-menu="isShowContextMenu = true"
            v-show="isShowChat"
            v-for="message in arrMessages" 
            :message="message"
            :key="message.id"
            ></wraperMessageComp>
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
            :icon="['fas', 'paper-plane']" 
            @click="sendMessage"
            />
        </div>
    </div>
</template>

<script>
import wraperMessageComp from './wraperMessageComp.vue';
import { getChatMessagesById } from '@/api/messagesApi';
import { useMainStore } from '@/store/mainStore';
import { watch } from 'vue';
import { getUserById } from '@/api/usersApi';
import { createMessage } from '@/api/messagesApi';
import contextMenuComp from '@/components/mainView/messanger/contextMenuComp.vue'
export default {
    components: {
        wraperMessageComp,
        contextMenuComp,
    },
    data() {
        return {
            isShowContextMenu: false,
            store: useMainStore(),
            messageObj: {
                from_user_id: null,
                to_user_id: null,
                chat_id: null,
                content: '',
                forwarded_ids: null,
            },
            arrMessages: [],
            isShowNotice: true,
            isShowChat: false,
            chatId: null,
            paginator: null,
            page: 1,
            perPage: 20,
            toUserId: null,
            toUserName: '',
            toUserLastname: '',
        }
    },
    methods: {
        async renderChat(id) {
            this.$router.push({ name: 'chat', params: { chatId: id } });
        },
        async handlerGetMessages(chatId) {
            const response = await getChatMessagesById(chatId, this.page, this.perPage);
            this.arrMessages = response.messages;
            this.paginator = response.paginator;
            this.createMessageObj(response.messages[0].fromUserId, response.messages[0].toUserId, chatId);
            this.store.chatData.chatId = chatId;
            this.store.chatData.toUserId = response.messages[0].toUserId;
            this.store.chatData.isShowChat = true;
            this.store.chatData.isShowNotice = false;
        },
        async renderHeaderById(userId) {
            const dataUser = await getUserById(userId);
            this.toUserName = dataUser.data.name;
            this.toUserLastname = dataUser.data.lastname;
        },
        createMessageObj(fromId, toId, chatId) {
            this.messageObj.from_user_id = fromId;
            this.messageObj.to_user_id = toId;
            this.messageObj.chat_id = chatId;
        },
        async sendMessage() {
            if(this.messageObj.content !== ''){
                await createMessage(this.messageObj);
                this.handlerGetMessages(this.messageObj.chat_id);
                this.messageObj.from_user_id = null;
                this.messageObj.to_user_id = null;
                this.messageObj.chat_id = null;
                this.messageObj.content = '';
            }
        }
    },
    created() {
        watch(() => this.store.chatData, (newValue, oldValue) => {
            this.chatId = newValue.chatId;
            if(newValue.isShowNotice === false) {
                this.isShowNotice = false;
            }
            if(newValue.isShowChat === true) {
                this.isShowChat = true;
                this.renderChat(newValue.chatId);
                this.renderHeaderById(newValue.toUserId)
            }
            if(newValue.chatId !== oldValue.chatId) {
                this.renderChat(newValue.chatId);
            }
        }, { deep: true });
        
        // Route params
        watch(() => this.$route.params, async (newValue) => {
            // { chatId: 18 }
            this.handlerGetMessages(newValue.chatId);            
        })
    },
    async mounted() {
        if(this.$route.params.chatId !== undefined) {
            this.handlerGetMessages(this.$route.params.chatId);
        } 
        const textarea = document.getElementById('input-message');
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if(this.message != ''){
                    this.sendMessage(this.message);
                }
                this.message = '';
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
        width: 100%;
        height: 80%;
        overflow: auto;
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