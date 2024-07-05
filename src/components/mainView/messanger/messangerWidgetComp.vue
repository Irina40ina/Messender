<template>
    <div class="message-widget">
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
                <p class="avatar-stub">{{ 'HH' }}</p>
            </div> 
            <div class="message__users-name-container">
                <p class="users__name">{{ 'Harry Potter' }}</p>
            </div>
        </div>

        <!-- Content -->
        <div class="message-content">
            <wraperMessageComp
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
                @input="(e) => message = e.target.value"
                :value="message"
                ></textarea>
        </div>
    </div>
</template>

<script>
import wraperMessageComp from './wraperMessageComp.vue';
import { getChatMessagesById } from '@/api/messagesApi';
import { useMainStore } from '@/store/mainStore';
import { watch } from 'vue';
export default {
    components: {
        wraperMessageComp,
    },
    data() {
        return {
            store: useMainStore(),
            message: '',
            arrMessages: [],
            isShowNotice: true,
            isShowChat: false,
            paginator: null,
            page: 1,
            perPage: 20,
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
            this.store.chatData.chatId = chatId;
            this.store.chatData.isShowChat = true;
            this.store.chatData.isShowNotice = false;
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
    mounted() {
        this.handlerGetMessages(this.$route.params.chatId);

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
        // if(this.isShowNotice = false) {
        //     const response = await getChatMessagesById(this.chatId);
        //     console.log(response)
        // }
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
        height: 85%;
        overflow: auto;
    }
    .input-message-panel {
        height: 10%;
        width: 100%;
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
        padding: 0.5rem 1rem;
        box-shadow: var(--shadow);
    }
</style>