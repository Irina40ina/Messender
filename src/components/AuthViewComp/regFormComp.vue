<template>
    <form 
    class="reg-form"
    @submit.prevent
    >
        <inputComp  
        :type="'text'" 
        :placeholder= "'Введите Имя'"
        v-model="firstName"
        ></inputComp>
        <inputComp  
        :type="'text'" 
        :placeholder= "'Введите Фамилию'"
        v-model="lastName"
        ></inputComp>
        <inputComp  
        :type="'email'" 
        :placeholder= "'Введите email'"
        v-model="email"
        ></inputComp>
        <inputComp 
        type="'password'" 
        placeholder="Введите пароль"
        v-model="password"
        ></inputComp>
        <btnComp
        @click="dataSubmit"
        >
        Войти</btnComp>
    </form>
</template>
<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    },
    emits: ['dataSubmit'],
    methods: {
        dataSubmit() {
            this.$emit('dataSubmit', { firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password })
        }
    },
}
</script>
<style scoped>
    .reg-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg-main);
    z-index: 10;
}
</style>