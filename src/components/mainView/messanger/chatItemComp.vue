<template>
    <div 
    class="chat-item"
    @click="handlerOpenChat"
    >
        <div class="chat__header">
            <div class="chat__avatar-container">
                <div class="users__avatar">
                    <h1 class="avatar-stub">{{ computeChatInitials }}</h1>
                </div> 
            </div>
            <div class="users__name-container">
                <p class="users__name">{{ computeChatName }}</p>
            </div>
        </div>
        <div class="chat__last-message-container">
            <p class="text-last-message"> {{ $props.chat.previewMessage }} </p>
        </div>
        <div class="last-activity-container">
            <p class="last-activity"> 2ч. назад </p>
        </div>
    </div>
</template>

<script>
import { useMainStore } from '@/store/mainStore';
export default {
    data() {
        return {
            store: useMainStore(),
        }
    },
    emits: ['openChat'],
    props: {
        chat: {
            type: Object,
            required: true,
        }
    },
    computed: {
        computeChatInitials() {
            return this.$props.chat.users[0].name.slice(0,1).toUpperCase() + this.$props.chat.users[0].lastname.slice(0,1).toUpperCase();
        },
        computeChatName() {
            return this.$props.chat.users[0].name + ' ' + this.$props.chat.users[0].lastname
        }
    },
    methods: {
        handlerOpenChat() {
            this.$emit('openChat', this.$props.chat);
        }
        // handlerGetChatById(chat) {
        //     this.store.chatData.chatId = chat.id;
        //     this.store.chatData.isShowNotice = false;
        //     this.store.chatData.isShowChat = true;
        //     this.store.chatData.toUserId = chat.users[0].id;
        // }
    },
}
</script>

<style scoped>
    .chat-item {
        position: relative;
        width: 100%;
        height: 105px;
        border: 1px solid var(--primary-fg);
        border-radius: var(--radius);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: .2rem;
        box-shadow: var(--shadow);
    }
    .chat-item + .chat-item {
        margin: .8rem auto 0 auto;
    }
    .chat__header {
        width: 80%;
        height: 50%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .chat__avatar-container {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .users__avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-stub {
        color: white;
        font-size: 20px;
    }
    .users__name-container {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        position: relative;
        padding: 0 0 0 0.5rem;
    }
    .users__name {
        font-size: 20px;
        font-family: var(--font);
    }
    .chat__last-message-container {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: .2rem;
        border-radius: var(--radius);
    }
    .text-last-message {
        font-family: var(--font);
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .last-activity-container {
        position: absolute;
        top: 0;
        right: 0;
        width: max-content;
        padding: .3rem .5rem;
    }
    .last-activity {
        font-family: var(--font);
        font-size: 16px;
        color: gray;
    }
</style>