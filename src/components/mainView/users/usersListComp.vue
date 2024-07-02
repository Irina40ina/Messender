<template>
    <div class="users-list">

        <!-- Создание нового сообщения с новым чатом -->
        <primaryDialogComp
        :is-show="isShowInviteChat"
        @close="isShowInviteChat = false"
        >
            <inviteChatComp
            :user="selectedInviteUser"
            ></inviteChatComp>
        </primaryDialogComp>

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

            <!-- Last Activity -->
            <div class="users__last-activity-container">
                <p class="users__last-activity"> {{ /* user.lastActivity */  '2 ч. назад' }} </p>
            </div>
            <button 
            class="btn-invite" 
            @click="() => handlerInviteChat(user)"
            >Написать сообщение</button>
        </div>
    </div>
</template>

<script>
import primaryDialogComp from '@/components/UI/primaryDialogComp.vue';
import inviteChatComp from "@/components/mainView/users/inviteChatComp.vue";
export default {
    components: {
        primaryDialogComp,
        inviteChatComp,
    },
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
            isShowInviteChat: false,
            selectedInviteUser: null,
        }
    },
    methods: {
        handlerInviteChat(user) {
            this.isShowInviteChat = true;
            this.selectedInviteUser = user;
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
        width: max-content;
        height: max-content;
        right: 20px;
        top: 10px;
    }
    .users__last-activity {
        font-family: var(--font);
        color: gray;
    }
    .btn-invite {
        padding: .3rem .8rem;
        white-space: nowrap;
        outline: rgba(0,0,0,0);
        border: 1px solid var(--primary-fg);
        cursor: pointer; 
        margin-right: 1rem;   
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        transition: all .6s ease;
    }
    .btn-invite:active {
        transition: all .3s ease;
        box-shadow: none;
    }
</style>