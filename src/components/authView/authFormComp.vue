<template>
    <form 
    class="auth-form"
    @submit.prevent
    > 
        <h1 class="auth-form__title">Авторизация</h1>
        <div class="input-block">
            <!-- E-mail -->
            <inputComp  
            style="width: 100%"
            :type="'email'" 
            :placeholder= "'Введите email'"
            v-model="email"
            ></inputComp>

            <!-- Password -->
            <inputComp 
            style="width: 100%"
            type="password"
            placeholder="Введите пароль"
            v-model="password"
            ></inputComp>
        </div>
        
        <div class="action-block">
            <btnComp @click="$router.push({ name: 'logup' })">Регистрация</btnComp>
            <btnComp @click="handlerLogin">Войти</btnComp>
        </div>
        
    </form>
</template>
<script>
import { login } from "@/api/authApi.js"
import { isValidEmail, isValidPassword } from '@/utils/validation';
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    emits: ['dataSubmit', 'isShow'],
    methods: {
        dataSubmit() {
            try {
                this.$emit('dataSubmit', { email: this.email, password: this.password })      
            } catch (err) {
                console.error(`components/authView/authFormComp.vue: dataSubmit  => ${err}`)
            }
        },
        async handlerLogin() {
            try {
                console.log(isValidPassword(this.password));
                // if(this.email !== '' && this.password !== '') { 
                //     await login(this.email, this.password);
                //     this.$router.push({ name: 'main' });
                // } else {
                //     return;
                // }
            } catch (err) {
                console.error(`components/authView/authFormComp.vue: handlerLogin  => ${err}`)
            }
        }
    },
    
}
</script>
<style scoped>
.auth-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    background-color: var(--color-bg-main);
    border-radius: 5px;
    padding: 2rem 5rem;
}
.auth-form__title {
    color: var(--primary-fg);
    text-align: center;
    margin-bottom: auto;
}
.input-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: auto;
}
.action-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>