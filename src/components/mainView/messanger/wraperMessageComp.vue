<template>
    <div class="wraper-message" v-for="message in $props.arrMessages" :key="message.id">
        <div class="message">
            <p>{{ message.value }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        arrMessages: {
            type: Array,
            default: () => [],
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
    box-shadow: -10px -6px 10px -3px rgba(81, 115, 81, 0.5);
    background-color: #fff;
}
</style>