<template>
    <div class="profile-container">
        <div class="profile">
            <header class="profile__header">
                <div class="profile__avatar">
                    <h1 class="avatar-stub">AM</h1>
                </div>
                <h1 class="profile__username">Alex Mercer Surname</h1>
            </header>
            <main class="profile__info">

                <!-- БЛОК Учетных данных пользователя -->
                <div class="profile__chunk"> 
                    <!-- E-MAIL -->
                    <itemChunkComp
                    :item="{ id: 'email', key: 'E-mail', value: null }"
                    />

                    <!-- LOGIN -->
                    <itemChunkComp
                    :item="{ id: 'login', key: 'Логин', value: null }"
                    />

                    <!-- PHONE NUMBER -->
                    <itemChunkComp
                    :item="{ id: 'phone-number', key: 'Номер телефона', value: null }"
                    />
                </div>

                <!-- БЛОК С Инициалами пользователя -->
                <div class="profile__chunk">
                    <!-- NAME -->
                    <itemChunkComp 
                    :item="{ id: 'name', key: 'Имя', value: null }"
                    />

                    <!-- LASTNAME -->
                    <itemChunkComp 
                    :item="{ id: 'lastname', key: 'Фамилия', value: null }"
                    />

                    <!-- SURNAME -->
                    <itemChunkComp 
                    :item="{ id: 'surname', key: 'Отчество', value: null }"
                    />
                </div>

                <!-- БЛОК С доп. информацией  -->
                <div class="profile__chunk" style="grid-column: 1 / span 2;">
                    <!-- GENDER -->
                    <itemChunkComp 
                    :item="{ id: 'gender', key: 'Пол', value: null }"
                    />

                    <!-- BIRTH AT -->
                    <itemChunkComp 
                    :item="{ id: 'birth-at', key: 'Дата рождения', value: null }"
                    />

                    <!-- CREATED AT -->
                    <itemChunkComp 
                    :item="{ id: 'created-at', key: 'Дата создания аккаунта', value: null }"
                    />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import itemChunkComp from './profileChunk/itemChunkComp.vue';
export default {
    components: {
        itemChunkComp,
    }
}
</script>

<style scoped>
    .profile-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-family: var(--font);
    }
    .profile {
        width: 80%;
        height: max-content;
        margin: 2rem 0;
    }
    .profile__header {
        width: 100%;
        height: 200px;
        position: relative;
        display: flex;
        align-items: center;
        border-radius: var(--radius);
        background-color: var(--default-bg);
    }
    .profile__avatar {
        position: absolute;
        left: 5%;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-stub {
        color: white;
    }
    .profile__username {
        position: absolute;
        right: 2rem;
        bottom: 1rem;
        color: var(--color-fg-header);
        margin: 0;
    }
    .profile__info{
        height: max-content;
        display: grid;
        grid-template-columns: repeat(2, minmax(100px, 1fr));
        grid-template-rows: repeat(4, minmax(100px, auto));
        gap: 1rem;
        padding: 1rem 3rem;
    }
    .profile__chunk {
        width: 100%;
        min-height: 150px;
        height: max-content;
        background-color: var(--default-bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius);
        align-self: start;
    }
</style>