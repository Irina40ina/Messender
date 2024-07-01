<template>
    <div class="users-list">
        <div 
        class="users-item"
        v-for="user in arrayUsers"
        :key="user.id"
        >
            <div class="users__avatar-container">
               <div class="users__avatar">
                    <h1 class="avatar-stub">{{ user.name.slice(0,1).toUpperCase() + user.lastname.slice(0,1).toUpperCase() }}</h1>
                </div> 
            </div>
            <div class="users__name-container">
                <p class="users__name">{{ user.name + ' ' + user.lastname }}</p>
            </div>
            <div class="users__last-activity-container">
                <p class="users__last-activity"> {{ user.lastActivity }} </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        arrayUsers: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            users: [],
            initials: '',
        }
    },
    mounted() {
        this.users = this.$props.arrayUsers;
    }
}
</script>

<style scoped>
    .users-list {
        width: 95%;
        height: max-content;
    }

    .users-item {
        width: 100%;
        height: 120px;
        border: 1px solid var(--primary-fg);
        border-radius: 10px;
        box-shadow: var(--shadow);
        margin-top: .5rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .users__avatar-container {
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .users__avatar {
        left: 5%;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-stub {
        color: white;
    }
    .users__name-container {
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        position: relative;
    }
    .users__name {
        font-size: 24px;
        font-family: var(--font);
    }
    .users__last-activity-container {
        position: absolute;
        width: 400px;
        height: 40px;
        right: 20px;
        top: 10px;
        border: 1px solid gray;
    }
    .users__last-activity {
        font-family: var(--font);
        color: gray;
    }
</style>