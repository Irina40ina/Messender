<template>
    <div class="messanger-container__chats">
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
        <div class="chat-item"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .messanger-container__chats {
        width: 20%;
        padding: 0.5rem;
        overflow: auto;
    }
    .messanger-container__chats::-webkit-scrollbar {
        width: 8px; /* Ширина скроллбара */
    }

    /* Стили для трека (полосы) */
    .messanger-container__chats::-webkit-scrollbar-track {
        background: #f1f1f1; /* Цвет фона трека */
    }

    /* Стили для полосы прокрутки (бегунка) */
    .messanger-container__chats::-webkit-scrollbar-thumb {
        background-color: #65c07c; /* Цвет полосы прокрутки */
    }

    /* Изменение внешнего вида при наведении на скроллбар */
    .messanger-container__chats::-webkit-scrollbar-thumb:hover {
        background-color: #4b8f5c;
    }

    .chat-item {
        width: 100%;
        height: 130px;
        margin: .3rem auto 0 auto;
        border: 1px solid var(--primary-fg);
        border-radius: var(--radius);
    }
    .chat-item + .chat-item {
        margin: .5rem auto 0 auto;
    }
</style>