<template>
    <div class="forwarding-container">
        <ul 
        v-if="$props.message?.forwardedMessages?.length > 0" 
        class="forwarded-list" 
        >
            <li 
            class="forwarded-item"
            v-for="message in $props.message?.forwardedMessages" 
            :key="message.id"
            >
                <forwardingContainerComp
                :message="message"
                /> 
                <p class="content-item">
                    <p>{{ message.fromUser.name + ' ' + message.fromUser.lastname }}</p>
                    {{message.content}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import forwardingContainerComp from '@/components/mainView/messanger/forwardingContainerComp.vue';
export default {
    components: {
        forwardingContainerComp,
    },
    props: {
        message: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style scoped>
.forwarding-container {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.164);
    margin-bottom: .4rem;
}
.forwarded-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-left: 2px solid white;
    border-radius: 5px;
}
.forwarded-item {
    width: 98%;
    height: max-content;
    padding: 0.4rem 0;
}
.content-item {
    text-align: left;
    padding-left: 1rem;
}
</style>
