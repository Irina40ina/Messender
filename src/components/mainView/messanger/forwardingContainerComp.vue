<template>
    <div class="forwarding-container">
        <ul 
        v-if="$props.message?.forwardedMessages?.length > 0" 
        class="forwarded-list" 
        >
        <span> Переслано от:</span>
            <li 
            class="forwarded-item"
            v-for="message in $props.message?.forwardedMessages" 
            :key="message.id"
            >
                <forwardingContainerComp
                :message="message"
                /> 
                <div class="content-item">
                    <div class="forwarded-user-container">
                        <div class="forwarded-message-icon">
                            <p>{{ message.fromUser.name[0] + message.fromUser.lastname[0] }}</p>
                        </div>
                        <p class="user-name">{{ message.fromUser.name + ':' }}</p>
                    </div>
                    
                    <p class="message-content">{{message.content}}</p>
                </div>
                    
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
    min-width: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: rgba(163, 163, 163, 0.3);
    border-radius: 5px;
    padding: 0 .3rem;
}
.forwarding-container ul {
    list-style-type: none;
}
.forwarded-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 5px;
}
.forwarded-list span {
    width: 100%;
    border-bottom: 1px solid rgba(77, 77, 77, 0.5);
    font-style: italic;
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
.forwarded-user-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.forwarded-message-icon {
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
.forwarded-message-icon p {
    font-size: 12px; 
    color: white;
}
.user-name {
    font-style: italic;
}

</style>
