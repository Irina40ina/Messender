<template>
    <div class="wraper-message">
        <div class="message">
            <p>{{ `${$props.messageText}` }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        send: {
            type: Boolean,
        },
        messageText: {
            type: String,
        }
    },
    
}
</script>

<style scoped>
   .wraper-message {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0.3rem 0.8rem;
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
        box-shadow: -10px -6px 10px -3px rgba(81,  115,  81, 0.5);
        background-color: #fff;
    } 
</style>