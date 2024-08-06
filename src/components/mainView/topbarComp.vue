<template>
    <div class="topbar">
        <div class="topbar-title">
            <h1>Messanger</h1>
        </div>
        <div class="topbar-user-area">

            <div class="topbar-name-container">
                <h2 class="topbar-user-name">{{ computeUserName }}</h2>
            </div>

            <div class="topbar-avatar">
                <p class="avatar-stub">{{ computeInitials }}</p>
            </div>
            
            <font-awesome-icon 
            class="leave-icon"
            icon="fa-arrow-right-from-bracket"
            @click="logout"
            ></font-awesome-icon>
        </div>    
    </div>
</template>

<script>
import { useMainStore } from '@/store/mainStore';
export default {
    data() {
        return {
            store: useMainStore(),
        }
    },
    methods: {
        logout() {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$router.push({name: 'auth'})
            } catch (err) {
                
            }
        }
    },
    computed: {
        computeUserName() {
            try {
                return this.store.user?.name + ' ' + this.store.user?.lastname;
            } catch (err) {
                console.error(`components/mainView/topbarComp: computeUserName => ${err}`)
            }
        },
        computeInitials() {
            try {
                return [...this.store.user?.name][0].toUpperCase() + [...this.store.user?.lastname][0].toUpperCase();
            } catch (err) {
                console.error(`components/mainView/topbarComp: computeInitials => ${err}`)
            }
        }
    }
}
</script>

<style scoped>
.topbar {
    grid-area: header;
    border-bottom: var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between; 
}  
.topbar-title {
    width: 15%;
}
h1 {
    font-family: var(--font);
    color: var(--primary-fg);
    text-align: center;
}
.topbar-user-area {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: end;
}
.topbar-name-container {
    width: 50%;
    padding: 0 1rem;
}
.topbar-user-name {
    font-family: var(--font);
    color: var(--topbar-fg);
    text-align: end;
}
.topbar-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--topbar-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}
.avatar-stub {
    font-size: 1.5rem;
    font-family: var(--font);
    font-weight: 700;
    color: var(--primary-fg);
}
.leave-icon {
    width: 30px;
    height: 40px;
    cursor: pointer;
    padding: 0 .5rem;
    color: var(--topbar-fg);
    transition: all .4s ease;
}
.leave-icon:hover {
    color: var(--primary-fg);
    transition: all .4s ease;
}
</style>