<template>
    <div 
    class="chat-item"
    @click="() => handlerGetChatById($props.chat.id)"
    >
        <div class="chat__header">
            <div class="chat__avatar-container">
                <div class="users__avatar">
                    <h1 class="avatar-stub">{{ $props.chat.users[0].name.slice(0,1).toUpperCase() + $props.chat.users[0].lastname.slice(0,1).toUpperCase() }}</h1>
                </div> 
            </div>
            <div class="users__name-container">
                <p class="users__name">{{ $props.chat.users[0].name + ' ' + $props.chat.users[0].lastname }}</p>
            </div>
        </div>
        <div class="chat__last-message-container">
            <p class="text-last-message"> Hello HelloHelloHelloHello Hello HelloHelloHelloHello Hello HelloHelloHelloHello Hello HelloHelloHelloHello </p>
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
    props: {
        chat: {
            type: Object,
            required: true,
        }
    },
    methods: {
        handlerGetChatById(chatId) {
            this.store.chatData.chatId = chatId;
            this.store.chatData.isShowNotice = false;
            this.store.chatData.isShowChat = true;
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped>
    .chat-item {
        position: relative;
        width: 100%;
        height: 130px;
        border: 1px solid var(--primary-fg);
        border-radius: var(--radius);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: .5rem;
    }
    .chat-item + .chat-item {
        margin: .5rem auto 0 auto;
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
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-stub {
        color: white;
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
        font-size: 24px;
        font-family: var(--font);
    }
    .chat__last-message-container {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: .5rem;
        box-shadow: var(--shadow);
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