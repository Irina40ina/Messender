<template>
    <div class="messanger-container__chats">
        <chatItemComp
        v-for="chat in arrayChats"
        :chat="chat"
        :key="chat.id"
        ></chatItemComp>
        <div
            class="triggerPagination"
            ref="triggerPagination"
            v-show="loading"
            >
                <font-awesome-icon class="icon" :icon="['fas', 'spinner']" />
            </div>
    </div>
</template>

<script>
import chatItemComp from '@/components/mainView/messanger/chatItemComp.vue'
import { getChats } from '@/api/chatsApi';
export default {
    components: {
        chatItemComp,
    },
    data() {
        return {
            page: 1,
            perPage: 3,
            arrayChats: [],
            paginator: null,
            loading: true,
        }
    },
    watch: {
        async page(newPage, oldPage) {
            if(newPage !== oldPage) {
                if(this.paginator.hasNext === true) {
                    const response = await getChats(this.page, this.perPage);
                    this.arrayChats = [...this.arrayChats, ...response.resultArray];
                    this.paginator = response.paginator;
                    if(this.paginator.hasNext === true) {
                        this.loading = true;
                    } 
                    else if(this.paginator.hasNext === false) {
                        this.loading = false;
                    }
                }
                this.loading = false;
            }
        }
    },
    async mounted() {
        console.log(this.paginator);
        const response = await getChats(this.page, this.perPage);
        this.arrayChats = response.data;
        this.paginator = response.paginator;

        // Observer ============
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
        };
        const callback = (entries) => {
            if(entries[0].isIntersecting === true) {
                this.page = this.page + 1;
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.triggerPagination);
        // ============
    }
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

    .triggerPagination {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 254, 254, 0);
        margin-top: 0.5rem;
    }
    @keyframes rotate-circle {
        100% {
            transform: rotate(360deg);
        }
    }
    .icon {
        color: var(--primary-fg);
        font-size: 1.25rem;
        animation-name: rotate-circle;
        animation-duration: .8s;
        animation-iteration-count: infinite;
    }
</style>