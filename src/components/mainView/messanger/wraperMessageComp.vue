<template>
    <div 
    class="wraper-message" 
    >
        <div class="message">
            <p>{{ $props.message.content }}</p>
        </div>
    </div>
</template>

<script>
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
    
    props: {
        message: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style scoped>
.wraper-message {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
}

.message {
    max-width: 70%;
    min-width: 5%;
    width: max-content;
    height: max-content;
    margin-left: auto;
    word-wrap: break-word;
    padding: 1rem 1.5rem;
    border-radius: 15px;
    box-shadow: var(--shadow);
    background-color: #fff;
}
</style>