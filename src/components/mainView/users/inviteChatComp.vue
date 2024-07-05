<template>
    <div class="invite-chat-block">
        <form 
        class="invite-chat-form"
        @submit.prevent
        >
        
        <!-- header -->
        <div class="chat-form-header">
            <p class="header-label"> Напишите сообщение для <strong>{{ $props.user?.name + ' ' + $props.user?.lastname }}</strong></p>
        </div>

        <!-- Input Panel -->
        <div class="invite-chat-form__input-panel">
            <textarea 
            class="input-panel__textarea" name="" id=""
            v-model="messageText"
            ></textarea>
            <button 
            class="input-panel__btn"
            @click="handlerCreateNewChat"
            >
                <font-awesome-icon class="btn-icon" :icon="['fas', 'paper-plane']" />
            </button>
        </div>
        
        </form>
    </div>
</template>

<script>
import { useMainStore } from '@/store/mainStore';
import { createNewChatWithMessage } from '@/api/messagesApi';
import { getChatById, createNewChat } from '@/api/chatsApi';
export default {
    data() {
        return {
            store: useMainStore(),
            messageText: '',
            messageObj: {
                from_user_id: null,
                to_user_id: null,
                chat_id: null,
                content: '',
                forwarded_ids: null,
            },
            chatObj: {
                creator: null,
                companion_id: null,
                preview_message: '',
            }
        }
    },
    props: {
        user: {
            type: Object,
            default: null,
            required: false,
        },
        myId: {
            type: Number,
            default: null,
        }
    },
    emits: ['close'],
    methods: {
        async handlerCreateNewChat() {
            this.messageObj.from_user_id = this.myId;
            this.messageObj.to_user_id = this.$props.user.id;
            this.messageObj.chat_id = null;
            this.messageObj.content = this.messageText;
            await createNewChatWithMessage(this.messageObj);
            this.$emit('close');

// Создание чата
        //     this.chatObj.creator = this.myId;
        //     this.chatObj.companion_id = this.$props.user.id;
        //     this.chatObj.preview_message = this.messageText;
        //     await createNewChat(this.chatObj);
        //     this.$emit('close');
        }
    }
}

</script>

<style scoped>
.invite-chat-block {
    width: max-content;
    height: max-content;
}
.invite-chat-form {
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.chat-form-header {
    padding: .4rem .6rem;
    color: var(--primary-fg);
    font-family: var(--font);
}
.header-label {
    text-align: center;
    font-family: var(--font);
}

.invite-chat-form__input-panel {
    height: auto;
    display: flex; 
    align-items: flex-end;
    padding: .9rem .6rem;
}
.input-panel__textarea {
    width: 90%;
    min-height: 50px;
    outline: rgba(0,0,0,0);
    height: auto;
    resize: none; 
    border: 1px solid var(--primary-fg);
    border-radius: var(--radius);
    padding: .4rem;
    font-size: 13px;
}
.input-panel__btn {
    width: 10%;
    font-size: 14px;
}
.btn-icon {
    color: var(--primary-fg);
    padding: .2rem;
    border-radius: var(--radius);
    transition: all 0.3s ease;
} 
.btn-icon:hover {
    transition: all 0.3s ease;
    background-color: rgba(128, 128, 128, 0.13);
}
</style>