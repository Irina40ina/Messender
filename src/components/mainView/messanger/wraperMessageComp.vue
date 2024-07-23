<template>
    <div 
    class="wraper-message" 
    @contextmenu.prevent="openMenu"
    >
        <div class="message">
            <div class="message-content__container">
               <p class="message-content">{{ $props.message.content }}</p>
            </div> 
            <div class="message-edit-time__container">
                <div class="message-edit__container" :style="editNote">
                    <p class="message-edit">Ред.</p>
                </div>
                <div class="message-time__container">
                    <p class="message-time">{{ store.messageTimeCreatedSrting($props.message.createdAt) }}</p>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { useMainStore } from '@/store/mainStore';
import { watch } from 'vue';
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
            display: '',
        }
    },
    props: {
        message: {
            type: Object,
            required: true,
        }
    },
    emits: ['openContextMenu'],

    computed: {
        editNote() {
            return {
                display: this.$props.message.edited ? 'block' : 'none',
            }
        }
    },
    methods: {
        openMenu() {
            console.log(this.$props.message.edited)
            this.$emit('openContextMenu', this.$props.message);
        }
    }
}
</script>

<style scoped>
.wraper-message {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
    background-color: #00000000;
}
.wraper-message:hover {
    transition: all 0.3s ease;
    background-color: #00000021;
}

.message {
    max-width: 70%;
    min-width: 10%;
    width: max-content;
    height: max-content;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
    padding: 1rem 1.5rem;
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
    font-size: 20px;
}
.message-edit-time__container {
    width: 100%;
    height: 20px;
    position: relative;
}
.message-edit__container {
    width: 50%;
    position: absolute;
    left: 0px;
    bottom: -5px;
}
.message-edit {
    text-align: start;
    color: gray;
    font-family: var(--font);
    font-size: 16px;
}
.message-time__container {
    width: 50%;
    position: absolute;
    right: 0px;
    bottom: -5px;
}
.message-time {
    text-align: end;
    color: gray;
    font-family: var(--font);
    font-size: 16px;
}
</style>