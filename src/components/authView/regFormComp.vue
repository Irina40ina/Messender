<template>
    <form 
    class="reg-form"
    @submit.prevent
    >
        <h1 class="auth-form__title">Регистрация</h1>
        <div class="input-block">
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
            type="password" 
            placeholder="Введите пароль"
            v-model="password"
            ></inputComp>
        </div>
        
        <div class="action-block">
            <btnComp
            style="margin-left: 2rem;"
            @click="handlerLogup" 
            >
                Зарегистрироваться
            </btnComp>
            <btnComp
            style="margin-right: 2rem;"
            @click="$router.push({ name: 'login' })"
            >
            Войти</btnComp>
        </div>
    </form>
</template>
<script>
import { logup } from "@/api/authApi"
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    },
    methods: {
        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        async handlerLogup() {
            try {
                const isValidEmail = this.validateEmail(this.email)
                if(
                    this.firstName !== '' && 
                    this.lastName !== '' && 
                    this.email !== '' && 
                    this.password !== '' && 
                    isValidEmail !== null) {
                        await logup(this.firstName, this.lastName, this.email, this.password); 
                } 
                else {
                    console.log('ELSE');
                    return;
                }
            } catch (err) {
                console.error(`components/authView/regFormComp.vue: handlerLogup  => ${err}`)
            }              
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