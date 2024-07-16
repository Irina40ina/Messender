<template>
    <div class="messanger-container">
        <messangerChatsComp
        @open-chat="(e) => handlerOpenChat(e)"
        ></messangerChatsComp>
        <messangerWidgetComp
        :openned-chat="opennedChat"
        ></messangerWidgetComp>
    </div>
</template>

<script>
import messangerChatsComp from "@/components/mainView/messanger/messangerChatsComp.vue"
import messangerWidgetComp from "@/components/mainView/messanger/messangerWidgetComp.vue"

export default {
    components: {
        messangerChatsComp,
        messangerWidgetComp,
    },
    data() {
        return {
            opennedChat: null,
        }
    },
    methods: {
        handlerOpenChat(e) {
            this.opennedChat = e;
        }
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