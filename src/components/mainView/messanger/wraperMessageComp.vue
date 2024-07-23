<template>
    <div 
    class="wraper-message" 
    :class="($props.isSelected === true)? 'selected' : ''"
    @contextmenu.prevent="openMenu"
    >
        <div class="message" :class="computePositionMessage">
            <div class="message-content__container">
               <p class="message-content">{{ $props.message.content }}</p>
            </div> 
            <div class="message-edit-time__container">
                <div 
                class="message-edit__container"
                v-show="$props.message.edited"
                >
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
        },
        isSelected: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    emits: ['openContextMenu'],
    computed: {
        computePositionMessage() {
            if(this.store.user.id === this.$props.message.fromUserId) {
                return 'me';
            } else {
                return '';
            }
        }
    },
    methods: {
        openMenu() {
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
    padding: 0.3rem 1rem;
    transition: all 0.3s ease;
    margin-bottom: 1px;
    background-color: #00000000;
}
.wraper-message:hover {
    transition: all 0.3s ease;
    background-color: #00000021;
}
.wraper-message.selected {
    background-color: #00000021;
}

.message {
    position: relative;
    max-width: 70%;
    min-width: 7%;
    width: max-content;
    height: max-content;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
    padding: 0.1rem 1rem 0.1rem 1rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
    background-color: #fff;
}
.me {
    margin-left: auto;
    margin-right: 0;
}
.message-content__container {
    width: 100%;
    height: max-content;
}
.message-content {
    font-family: var(--font);
    font-size: 16px;
}
.message-edit-time__container {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
}
.message-edit__container {
    margin-right: 0.4rem;
}
.message-edit {
    text-align: start;
    color: gray;
    font-family: var(--font);
    font-size: 12px;
}
.message-time__container {
    position: relative;
    right: -5px;
    display: flex;
    margin-left: auto;
}
.message-time {
    text-align: end;
    color: gray;
    font-family: var(--font);
    font-size: 12px;
}
</style>