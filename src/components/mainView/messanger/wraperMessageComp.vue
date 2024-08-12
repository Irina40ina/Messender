<template>
    <div 
    class="wraper-message" 
    :class="($props.isSelected === true)? 'selected' : ''"
    @contextmenu.prevent="openMenu"
    @click="selectMessage"
    >
        <div class="message" :class="computePositionMessage">
            <forwardingContainerComp :message="message"></forwardingContainerComp>
            <div class="reply-message-container">
                <span class="reply-message-fd-count" v-if="$props.message.relatedMessage?.isForwarding">
                    Пересланные сообщения: <span style="font-weight: bolder;">{{ $props.message.relatedMessage.forwardedMessagesCount }}</span>
                </span>
                <span class="reply-message-content" v-if="$props.message.replied">
                    <div class="reply-message-icon" v-if="store.user.id !== $props.message.relatedMessage.fromUserId">
                      <p>{{ computeInitials }}</p>
                    </div>
                    <span v-else> {{ computeInitials }} </span>
                    {{ $props.message.relatedMessage.content }}
                </span>
            </div>
            
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
import forwardingContainerComp from './forwardingContainerComp.vue';
import { watch } from 'vue';
export default {
    components: {
        forwardingContainerComp,
    },
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
        },
        opennedChat: {
            type: Object,
            required: false,
            default: null,
        },
    },
    emits: ['openContextMenu', 'selectMessage'],
    computed: {
        computePositionMessage() {
            try {
                if(this.store.user.id === this.$props.message.fromUserId) {
                    return 'me';
                } else {
                    return '';
                }
            } catch (err) {
                console.error(`components/mainView/wraperMessageComp: computePositionMessage => ${err}`)
            }
        },
        computeInitials() {
            if(this.store.user.id === this.$props.message.relatedMessage.fromUserId) {
                return 'Вы:'
            } else {
                return this.$props.opennedChat.users[0].name.slice(0,1).toUpperCase() + this.$props.opennedChat.users[0].lastname.slice(0,1).toUpperCase();
            }
        }
    },
    methods: {
        openMenu() {
            try {
                this.$emit('openContextMenu', this.$props.message);
            } catch (err) {
                console.error(`components/mainView/wraperMessageComp: openMenu => ${err}`)
            }
        },
        selectMessage() {
            try {
                this.$emit('selectMessage', this.$props.message);
            } catch (err) {
                console.error(`components/mainView/wraperMessageComp: selectMessage => ${err}`)
            }
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
.reply-message-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: rgba(163, 163, 163, 0.3);
    border-radius: 5px;
    padding: 0 .5rem;
}
.reply-message-fd-count {
    width: 100%;
    height: max-content;
    overflow: hidden;
    border-bottom: 1px solid rgba(77, 77, 77, 0.5);
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: .1rem .8rem;
    font-family: var(--font);
    font-style: italic;
    font-weight: 100px;
    color: rgba(77, 77, 77, 0.8);
    cursor: pointer;
}
.reply-message-icon {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(161, 80, 161);
    border-radius: 50%;
    overflow: hidden;
    margin-right: .3rem;
}
.reply-message-icon p {
   font-size: 12px; 
   color: white;
}
.reply-message-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: max-content;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: .3rem 0;
    cursor: pointer;
}
.reply-message-content span {
    margin-right: .3rem;
}
</style>