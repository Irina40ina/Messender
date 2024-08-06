<template>
    <div class="message-widget" ref="messageWidget">
        
        <primaryDialogComp 
        :is-show="selectForwardingChat"
        >
            <div class="chats-forwading-container">
                <h1 class="chats-forwading-header">Выберите чат</h1>
                <messangerChatsComp
                @open-chat="(e) => handlerOpenChatForwading(e)"
                ></messangerChatsComp>
            </div>
           
        </primaryDialogComp>
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
        @delete-message="deleteMessage"
        @forward-message="forwardMessage"
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

            <!-- Actions -->
             <div 
             class="header-actions"
             v-show="isShowActionsBtn"
             >
                <button class="btn-forward" @click="forwardMessage">Переслать</button>
                <button 
                class="btn-delete"
                @click="deleteSeveralMessages"
                >Удалить</button>
                <div class="count-selected-messages">
                    <p class="count-selected-messages-text">Выбрано: {{ selectedMessagesId.length }}</p>
                </div>
             </div>
        </div>

        <!-- Content -->
        <div 
        class="message-content"
        ref="scrollContainer"
        >
             <!-- Trigger pagination -->
            <div 
            class="triggerPagination" 
            ref="triggerPagination"
            v-show="!!$route.params.chatId"
            ></div>
            <wraperMessageComp
            @open-context-menu="(e) => openContextMenu(e)"
            v-show="isShowChat"
            v-for="message in store.messages" 
            :message="message"
            :key="message.id"
            :is-selected="computeSelectedMessage(message.id)"
            @select-message="(e) => selectMessage(e)"
            >
            <forwardingContainerComp
            v-for="message in store.messages" 
            :message="message"
            :key="message.id"
            >
            </forwardingContainerComp>
        
            </wraperMessageComp>
        </div>
        <!-- Панель при ответе на сообщение -->
        <div 
        class="replyed-message-panel"
        v-show="isShowReplyedMessage"
        >
            <font-awesome-icon  class="icon-reply" :icon="['fas', 'reply']" />
            <div class="replyed-message-container">
                <p class="replyed-message-text">Ответ на сообщение: {{ selectedMessage?.content }}</p>
            </div>
        </div>
        <!-- Панель при пересылке сообщений -->
        <div 
        class="forwarding-message-panel"
        v-show="$props.forwardingMode"
        >
            <div class="forwarding-message-container">
                <p class="forwarding-message-text">Переслать сообщения: {{ selectedMessagesId.length }}</p>
            </div>
        </div>

        <!-- Панель при редактировании сообщения -->
        <div 
        class="edit-message-panel"
        v-show="editMode"
        >
            <div class="edit-message-container">
                <p class="edit-message-text">Редактирование</p>
            </div>
            <div class="cancel-icon-container"
            @click="cancelEditSelectedMessage">
                <p>Отменить</p>
                <font-awesome-icon class="cancel-icon" icon="fa-xmark"/>
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
            class="icon-loading" 
            :icon="['fas', 'spinner']" 
            v-show="isLoading"
            />
            <font-awesome-icon 
            class="btn-send-message" :style="{display: isLoading ? 'none' : 'block'}"
            v-show="isShowChat"
            :icon="['fas', 'paper-plane']" 
            @click="sendMessage"
            />
        </div>
    </div>
</template>

<script>
import wraperMessageComp from './wraperMessageComp.vue';
import { editMessage, getChatMessagesById, forwardMessage } from '@/api/messagesApi';
import { useMainStore } from '@/store/mainStore';
import { nextTick, watch } from 'vue';
import { createMessage, deleteMessagesById } from '@/api/messagesApi';
import contextMenuComp from '@/components/mainView/messanger/contextMenuComp.vue';
import primaryDialogComp from '@/components/UI/primaryDialogComp.vue';
import messangerChatsComp from '@/components/mainView/messanger/messangerChatsComp.vue';
import forwardingContainerComp from './forwardingContainerComp.vue';
export default {
    components: {
        wraperMessageComp,
        contextMenuComp,
        primaryDialogComp,
        messangerChatsComp,
        forwardingContainerComp,
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
            isShowActionsBtn: false,
            isLoading: false,
            chatId: null,
            paginator: null,
            page: 1,
            perPage: 15,
            toUserId: null,
            toUserName: '',
            toUserInitials: '',
            selectedMessage: null,
            editMode: false,
            opennedChat: null,
            selectedMessagesId: [],
            deletedMessagesId: [],
            selectForwardingChat: false,
        }
    },
    emits: ['openChatForwading', 'disableForwardingMode'],
    props: {
        opennedChat: {
            type: Object,
            required: false,
            default: null,
        },
        forwardingMode: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    methods: {
        async renderChat(id) {
            try {
                this.$router.push({ name: 'chat', params: { chatId: id } });
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: renderChat => ${err}`);
            }
        },
        async scrolling(top = undefined) {
            try {
                const targetElement = this.$refs.scrollContainer;
                await nextTick(); 
                targetElement.scroll({
                    top: top ?? targetElement.scrollHeight,
                    // behavior: null,
                });
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: scrolling => ${err}`);
            }
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
                console.error(`components/mainView/messangerWidgetComp: handlerGetMessages => ${err}`)
            } finally {
                this.scrolling();
                this.isShowLoadingData = false;
            }
        },

        createMessageObj(fromId, toId, chatId) {
            try {
                this.messageObj.from_user_id = fromId;
                this.messageObj.to_user_id = toId;
                this.messageObj.chat_id = chatId;
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: createMessageObj => ${err}`);
            }
        },
        async sendMessage() {
            this.isLoading = true;
            // Создание сообщения
            try {
                if (this.messageObj.content !== '' && this.editMode === false) {
                    let currentChat = this.$props.opennedChat ?? this.opennedChat;
                    this.messageObj.from_user_id = this.store.user?.id;
                    this.createMessageObj(this.store.user?.id, currentChat.users[0].id, currentChat.id);
                    const data = await createMessage(this.messageObj);
                    this.store.messages.push(data?.data);
                    console.log(data?.data)
                    this.scrolling();
                }
                // Редактирование
                if (this.messageObj.content !== '' && this.editMode === true) {
                    const response = await editMessage(this.selectedMessage.id, this.messageObj.content);
                    this.store.editSelectedMessageView(response.id, response);
                    this.editMode = false;
                }
                // Пересылка сообщения
                if (this.$props.forwardingMode === true) {
                    this.createMessageObj(this.store.user?.id, this.$props.opennedChat.users[0].id, this.$props.opennedChat.id);
                    this.messageObj.forwarded_ids = this.selectedMessagesId;        
                    const response = await forwardMessage(this.messageObj);
                    this.store.messages.push(response?.data);
                    this.$emit('disableForwardingMode');
                }
                this.messageObj.from_user_id = null;
                this.messageObj.to_user_id = null;
                this.messageObj.chat_id = null;
                this.messageObj.content = '';
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: sendMessage => ${err}`)
            } finally {
                this.isLoading = false;
            }
        },
        openContextMenu(message) {
            try {
                this.isShowContextMenu = true;
                this.selectedMessage = message;
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: openContextMenu => ${err}`);
            }
        },
        replyMessage() {
            try {
                this.isShowReplyedMessage = true;
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: replyMessage => ${err}`);
            }
        },
        editSelectedMessage() {
            try {
                if (this.selectedMessage) {
                    this.isShowEditMessagePanel = true;
                    this.messageObj.content = this.selectedMessage.content;
                    this.editMode = true;
                } 
            } catch (error) {
                console.error(`components/mainView/messangerWidgetComp: editSelectedMessage => ${err}`);
            }
        },
        cancelEditSelectedMessage() {
            try {
                this.messageObj.content = '';
                this.editMode = false;
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: cancelEditSelectedMessage => ${err}`);
            }
        },
        handlerSelectMessage() {
            try {
                this.selectedMessagesId.push(this.selectedMessage.id);
                this.isShowActionsBtn = true;
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: handlerSelectMessage => ${err}`);
            }
        },
        selectMessage(message) {
            try {
                if(this.selectedMessagesId.length > 0) {
                    if(this.selectedMessagesId.includes(message.id)) {
                        this.selectedMessagesId = this.selectedMessagesId.filter((el) => el !== message.id);
                    } else {
                        this.selectedMessage = message;
                        this.handlerSelectMessage();
                    }
                }
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: selectMessage => ${err}`);
            }
        },
        async deleteMessage() {
            try {
                if(this.deletedMessagesId.length === 0) {
                    this.deletedMessagesId.push(this.selectedMessage.id);
                }
                const response = await deleteMessagesById(this.deletedMessagesId, this.selectedMessage.chatId);
                if(response.meta.status === 'success') {
                    this.store.deleteSelectedMessages(this.deletedMessagesId);
                    if(this.deletedMessagesId.includes(this.$props.opennedChat.previewMessage.id)){
                        this.store.updatePreviewMessage(this.$props.opennedChat.id, response.data.lastMessage);
                    }
                }
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: deleteMessage => ${err}`)
            } finally {
                this.deletedMessagesId = [];
            }
        },
        deleteSeveralMessages() {
            try {
                this.deletedMessagesId = this.selectedMessagesId;
                this.deleteMessage();
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: deleteSeveralMessages => ${err}`);
            }
        },
        offModeEdit() {
            try {
                this.selectedMessage = null;
                this.editMode = false;
                this.messageObj = {
                    from_user_id: null,
                    to_user_id: null,
                    chat_id: null,
                    content: '',
                    forwarded_ids: null,
                }
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: offModeEdit => ${err}`);
            }
        },
        forwardMessage() {
            try {
               this.selectForwardingChat = true; 
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: forwardMessage => ${err}`);
            }
        },
        handlerOpenChatForwading(chatData) {
            try {
                this.$emit('openChatForwading', chatData)
                this.selectForwardingChat = false;
                // this.$router.push({name: 'chat', params: {chatId: e.id}});
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: handlerOpenChatForwading => ${err}`);
            }
        }
    },
    computed: {
        computeSelectedMessage() {
            try {
                return (messageId) => {
                    if(this.selectedMessagesId.includes(messageId)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } catch (err) {
                console.error(`components/mainView/messangerWidgetComp: computeSelectedMessage => ${err}`);
            }
        }
    },
    created() {
        watch(() => this.$props.opennedChat, async (newValue) => {
            if(newValue) {
                try {
                    await this.handlerGetMessages(newValue.id);
                    this.renderChat(newValue.id);
                    this.toUserName = newValue.users[0].name + ' ' + newValue.users[0].lastname;
                    this.toUserInitials = newValue.users[0].name.slice(0,1).toUpperCase() + newValue.users[0].lastname.slice(0,1).toUpperCase();
                } catch (err) {
                    console.error(`components/messanger/messangerWidgetComp: watch -> this.$props.opennedChat => ${err}`);
                } finally {
                    this.offModeEdit();
                }
            }
        }, { deep: true });
        watch(() => this.store.chats.length, async (newValue, oldValue) => {
            if(oldValue === 0 && newValue > 0 && this.$route.params.chatId !== undefined) {
                try {
                    const { userName, userLastname, chat } = this.store.extractUsernameByChatId(this.$route.params.chatId);
                    this.opennedChat = chat;
                    this.toUserName = userName + ' ' + userLastname;
                    this.toUserInitials = userName.slice(0,1).toUpperCase() + userLastname.slice(0,1).toUpperCase();
                } catch (err) {
                    console.error(`components/messanger/messangerWidgetComp: watch -> this.store.chats.length => ${err}`);
                }
            }
        }, { deep: false });
        watch(() => this.selectedMessagesId, (newValue) => {
            try {
                if(newValue.length === 0) {
                    this.isShowActionsBtn = false;
                } 
            } catch (err) {
                console.error(`components/messanger/messangerWidgetComp: watch -> this.selectedMessagesId => ${err}`);
            }
        });
    },
    async mounted() {
        try {
            if(this.$route.params.chatId !== undefined) {
                await this.handlerGetMessages(this.$route.params.chatId);
                // const { userName, userLastname } = await this.store.extractUsernameByChatId(this.$route.params.chatId)
                // this.toUserName = userName + ' ' + userLastname;
                // this.toUserInitials = userName.slice(0,1).toUpperCase() + userLastname.slice(0,1).toUpperCase();
            } 
        } catch (err) {
            console.error(`components/messanger/messangerWidgetComp: mounted -> handlerGetMessages => ${err}`);
        } 

        // Observer ============
        try {
            const options = {
                rootMargin: "0px",
                threshold: 1.0,
            };
            const callback = async (entries) => {
                if(entries[0].isIntersecting === true && this.$route.params.chatId && this.paginator.hasNext === true) {
                    const currentPosScroll = this.$refs.scrollContainer?.scrollHeight;
                    this.page = this.page + 1;
                    const response = await getChatMessagesById(this.$route.params.chatId, this.page, this.perPage);
                    this.store.messages = [...response.messages, ...this.store.messages];
                    this.paginator = response.paginator;
                    await nextTick();
                    this.scrolling(this.$refs.scrollContainer?.scrollHeight - currentPosScroll);
                }
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.triggerPagination);
        } catch (err) {
            console.error(`components/messanger/messangerWidgetComp: mounted -> Observer => ${err}`);
        }
        // ============

        // Обработчик нажатия кнопок (Enter)
        try {
            const textarea = document.getElementById('input-message');
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if(this.messageObj.content != ''){
                        this.sendMessage();
                    }
                }
            })
        } catch (err) {
            console.error(`components/messanger/messangerWidgetComp: mounted -> keydownEnter => ${err}`);
        }
        // Обработчик нажатия кнопок (Escape)
        try {
            window.addEventListener('keydown', (e) => {
                if(this.selectForwardingChat === true) {
                    return this.selectForwardingChat = false;
                }
                if(e.key === 'Escape' && this.$route.name === 'chat') {
                    this.$router.push({name: 'messanger'});
                    this.$route.params.chatId = undefined;
                    this.isShowNotice = true;
                    this.isShowChat = false;                                                                                                   
                    this.isShowReplyedMessage = false;
                    this.offModeEdit();
                }
            });
        } catch (err) {
            console.error(`components/messanger/messangerWidgetComp: mounted -> keydownEscape => ${err}`);
        }
    },

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
    .chats-forwading-container {
        width: 600px;
    }
    .chats-forwading-container .messanger-container__chats {
        width: 100%;
    }
    .chats-forwading-header {
        text-align: center;
        color: var(--primary-fg);
        font-family: var(--font);
        font-size: 1.6rem;
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
        z-index: 905;
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
        position: relative;
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
    .header-actions {
        position: absolute;
        right: 0;
        height: 100%;
        width: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }
    .btn-forward {
        width: 200px;
        font-family: var(--font);
        outline: rgba(0,0,0,0);
        border: 1px solid var(--primary-fg);
        cursor: pointer; 
        margin-right: 1rem;   
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        transition: all .6s ease;
    }
    .btn-delete {
        width: 200px;
        font-family: var(--font);
        outline: rgba(0,0,0,0);
        border: 1px solid var(--primary-fg);
        cursor: pointer; 
        margin-right: 1rem;   
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        transition: all .6s ease;
        
    }
    .count-selected-messages {
        width: 200px;
    }
    .count-selected-messages-text {
        text-align: center;
        font-family: var(--font);
    }
    .message-content {
        position: relative;
        width: 100%;
        height: 80%;
        overflow: auto;
    }
    .triggerPagination {
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(0, 0, 0, 0);
    }
    .replyed-message-panel {
        width: 90%;
        height: 40px;
        border-radius: 10px;
        border: 1px solid var(--violet);
        background-color: #fff;
        position: absolute;
        bottom: 16%;
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
    .forwarding-message-container {
        width: 90%;
    }
    .forwarding-message-panel {
        width: 90%;
        height: 40px;
        border-radius: 10px;
        border: 1px solid var(--violet);
        background-color: #fff;
        position: absolute;
        bottom: 16%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0.1rem 1rem;
        z-index: 900;
    }
    .forwarding-message-text {
        font-family: var(--font);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .edit-message-panel {
        width: 90%;
        height: 30px;
        border-radius: 10px;
        border: 1px solid var(--violet);
        background-color: #fff;
        position: absolute;
        bottom: 16%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        z-index: 1;
    }
    .edit-message-container {
        width: 90%;
    }
    .cancel-icon-container {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: end;
        cursor: pointer;
    }
    .cancel-icon {
        margin-left: .3rem;
        color: red;
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
    .icon-loading {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 6%;
        bottom: 18%;
        color: var(--primary-fg);
        font-size: 1.25rem;
        animation-name: rotate-circle;
        animation-duration: .8s;
        animation-iteration-count: infinite;
    }
    @keyframes rotate-circle {
        100% {
            transform: rotate(360deg);
        }
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