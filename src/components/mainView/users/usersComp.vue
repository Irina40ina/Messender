<template>
    <div class="users-container">
        <!-- HEADER -->
        <header class="users-header">
            <div class="input-panel">
                <input 
                class="search-input" 
                type="text"
                placeholder="Поиск..."
                v-model="searchField"
                >
                <button class="search-btn" @click="handlerSearchUser">
                    <font-awesome-icon style="color: var(--primary-fg)" :icon="['fas', 'magnifying-glass']" />
                </button>
            </div>
            <div class="actions-panel"
            v-if="false"
            >
            </div>
        </header>

        <!-- MAIN -->
        <main class="users-main">
            <div class="users-wrapper">
                <usersListComp
                :array-users="arrayUsers"
                ></usersListComp>

                <div
                class="triggerPagination"
                ref="triggerPagination"
                v-show="loading"
                >
                    <font-awesome-icon class="icon" :icon="['fas', 'spinner']" />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { getUsers } from "@/api/usersApi"
import usersListComp from "@/components/mainView/users/usersListComp.vue"
export default {
    components: {
        usersListComp,
    },
    data() {
        return {
            page: 1,
            perPage: 10, 
            arrayUsers: [],
            paginator: null,
            loading: true,
            searchField: '',
        }
    },
    watch: {
        async page(newPage, oldPage) {
            if(newPage !== oldPage) {
                const response = await getUsers(this.page, this.perPage);
                this.arrayUsers = [...this.arrayUsers, ...response.data];
                this.paginator = response.paginator;
                if(this.paginator.hasNext === true) {
                    this.loading = true;
                } 
                else if(this.paginator.hasNext === false) {
                    this.loading = false;
                }
            }
        }
    },
    methods: {
        debounce(func, delay) {
            let timeout;
            return (...arg) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, arg), delay);
            }
        },
        async handlerSearchUser() {
            try {
                this.page = 1;
                const { data, paginator } = await getUsers(this.page, this.perPage, this.searchField);
                this.arrayUsers = data;
                this.paginator = paginator;
            } catch (err) {
                console.error('./components/users/usersComp.vue: handlerSearchUser', err);                
            }
        }
    },
    async mounted() {
        // const searchInput = this.$refs.searchInput;
        // searchInput.addEventListener('input', this.debounce(() => {
        //     console.log(this.searchField);
        // }, 200))
        try {
            const response = await getUsers(this.page, this.perPage);
            this.arrayUsers = response.data;
            this.paginator = response.paginator;
        } catch (err) {
            console.error('./components/users/usersComp.vue: mounted => getUsers => ', err);        
        }
        
        // Observer ============
        try {
            const options = {
                rootMargin: "0px",
                threshold: 1.0,
            };
            const callback = (entries) => {
                if(entries[0].isIntersecting === true) {
                this.page = this.page + 1;
            }
            }
            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.triggerPagination);  
        } catch (err) {
            console.error('./components/users/usersComp.vue: mounted => Observer', err);
        }
        // ============
    }
}
</script>

<style scoped>
    .users-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        font-family: var(--font);
        padding: 0 0 0 1.5rem;
    }
    .users-header {
        height: 60px;
        display: flex;
        align-items: center;
    }

    /* INPUT PANEL */
    .input-panel {
        height: max-content;
        display: flex;
        align-items: center;
        justify-content: center;
        /* flex-grow: 1; */
        margin: 0 auto 0 2rem;
        width: 30%;
    }
    .search-input {
        width: 90%;
        padding: .3rem 1rem;
        outline: rgba(0,0,0,0);
        border: 1px solid var(--primary-fg);
        border-radius: 10px;
        margin-right: 0.3rem;
        box-shadow: var(--shadow);
    }
    .search-btn {
        border-radius: 5px;
        border: 1px solid var(--primary-fg);
        outline: rgba(0,0,0,0);
        padding: .2rem 0.5rem;
        transition: all 0.3s ease;
        background-color: #fff;
        box-shadow: var(--shadow);
    }
    .search-btn:hover {
        background-color: #e6e6e6;
        transition: all .3s ease;
    }
    .search-btn:active {
        transition: all .3s ease;
        box-shadow: none;
    }

    /* ACTIONS PANEL */
    .actions-panel {
        height: max-content;
        display: flex;
        align-items: center;
        flex-grow: 2;
    }
    
    .users-main {
        position: relative;
        height: 100%;
        max-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
    }
    .users-main::-webkit-scrollbar {
        display: none;
    }
    .users-wrapper {
        position: absolute;
        top: 0;
        width: 90%;
        height: max-content;
        border-top: 1px solid var(--primary-fg);
        border-bottom: 1px solid var(--primary-fg);
        overflow: auto; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        margin-top: 1.3rem;
        padding: 2rem 0;
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