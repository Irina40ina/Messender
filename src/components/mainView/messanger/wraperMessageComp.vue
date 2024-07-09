<template>
    <div
    class="wraper-message" 
    @contextmenu.prevent="$emit('openContextMenu')"
    >
        <div class="message">
            <div class="message-content__container">
               <p class="message-content">{{ $props.message.content }}</p>
            </div> 
            <span class="message-time">{{ store.messageTimeCreatedSrting($props.message.createdAt) }}</span>
        </div>
    </div>
</template>

<script>
import { useMainStore } from '@/store/mainStore';
/* 
    "id": null,
    "fromUserId": null,
    "toUserId": null,
    "chatId": null,
    "content": null,
    "createdAt": null,
    "updatedAt": null,
    "deletedAt": null,
    "isForwarding": null,
*/
export default {
    data() {
        return {
            store: useMainStore(),
        }
    },
    props: {
        message: {
            type: Object,
            required: true,
        }
    },
    emits: ['openContextMenu'],
}
</script>

<style scoped>
.wraper-message {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.wraper-message:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.message {
    position: relative;
    max-width: 70%;
    min-width: 5%;
    width: max-content;
    height: max-content;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
    padding: .6rem 1.5rem;
    border-radius: 15px;
    box-shadow: var(--shadow);
    background-color: #fff;
}
.message-content__container {
    width: 100%;
    height: max-content;
}
.message-content {
    font-family: var(--font);
    font-size: 16px;
}
/* .message-time__container {
    width: 100%;
    height: 20px;
    text-align: end;
} */
.message-time {
    position: absolute;
    right: 10px;
    bottom: -2px;
    color: gray;
    font-family: var(--font);
    font-size: 11px;
}
</style>