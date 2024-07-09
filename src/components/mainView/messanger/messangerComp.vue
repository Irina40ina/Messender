<template>
    <div class="messanger-container">
        <messangerChatsComp
        ></messangerChatsComp>
        <messangerWidgetComp
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