<template>
    <div class="messanger-container">
        <messangerChatsComp
        @open-chat="(e) => handlerOpenChat(e)"
        ></messangerChatsComp>
        <messangerWidgetComp
        @open-chat-forwading="handlerOpenChatForwading"
        :openned-chat="opennedChat"
        :forwarding-mode="forwardingMode"
        @disable-forwarding-mode="forwardingMode = false"
        ></messangerWidgetComp>
    </div>
</template>

<script>
import messangerChatsComp from "@/components/mainView/messanger/messangerChatsComp.vue";
import messangerWidgetComp from "@/components/mainView/messanger/messangerWidgetComp.vue"
import { useMainStore } from '@/store/mainStore';
import { watch } from 'vue';

export default {
    components: {
        messangerChatsComp,
        messangerWidgetComp,
    },
    data() {
        return {
            store: useMainStore(),
            opennedChat: null,
            forwardingMode: false,
        }
    },
    
    methods: {
        handlerOpenChat(chatData) {
            try {
                this.opennedChat = chatData;
            } catch (err) {
                console.error(`components/messanger/messangerComp: handlerOpenChat => ${err}`)
            }
        },
        handlerOpenChatForwading(chatData) {
            this.forwardingMode = true;
            this.opennedChat = chatData;
        }
    },
    created() {
        watch(() => this.store.chats.length, (newValue, oldValue) => {
            if (newValue > 0 && oldValue <= 0 && this.$route.params.chatId !== undefined) {
                this.store.chats.forEach((el) => {
                    if (el.id == this.$route.params.chatId) {
                        this.handlerOpenChat(el);
                    }
                });
            }
        });
    },

}
</script>

<style scoped>
    .messanger-container {
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>