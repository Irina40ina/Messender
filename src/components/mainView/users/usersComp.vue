<template>
    <div class="users-container">
        <!-- HEADER -->
        <header class="users-header">
            <div class="input-panel">
                <input 
                class="search-input" 
                type="text"
                placeholder="Поиск..."
                >
                <button class="search-btn">
                    <font-awesome-icon style="color: var(--primary-fg)" :icon="['fas', 'magnifying-glass']" />
                </button>
            </div>
            <div class="actions-panel"
            v-if="false"
            >
                <button></button>
            </div>
        </header>

        <!-- MAIN -->
        <main class="users-main">
            <div class="users-wrapper">
                <div class="users-item">
                    
                </div>
                <div class="users-item">
                    
                </div>
                <div class="users-item">
                    
                </div>
                <div class="users-item">
                    
                </div>
               
                <div 
                class="triggerPagination"
                ref="triggerPagination"
                >

                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    mounted() {
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
        };
        const callback = (entries) => {
            if(entries[0].isIntersecting === true) {
                
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.triggerPagination);
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
        border: 1px solid black;
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
        border: 1px solid black;
    }
    
    .users-main {
        height: 100%;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .users-wrapper {
        width: 90%;
        height: 90%;
        border-top: 1px solid var(--primary-fg);
        border-bottom: 1px solid var(--primary-fg);
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }
    .users-item {
        width: 95%;
        height: 120px;
        border: 1px solid var(--primary-fg);
        border-radius: 10px;
        box-shadow: var(--shadow);
        margin-top: .5rem;
    }
    .triggerPagination {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        margin-top: 0.5rem;
    }
</style>