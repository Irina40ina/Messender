<template>
    <form 
    class="auth-form"
    @submit.prevent
    > 
        <h1 class="auth-form__title">Авторизация</h1>
        <div class="input-block">
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
            @click="$router.push({ name: 'logup' })"
            >
                Регистрация
            </btnComp>
            <btnComp
            style="margin-right: 2rem;"
            @click="handlerLogin"
            >
            Войти</btnComp>
        </div>
        
    </form>
</template>
<script>
import { login } from "@/api/authApi.js"
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
                if(this.email !== '' && this.password !== '') { 
                    await login(this.email, this.password);
                    this.$router.push({ name: 'main' });
                } else {
                    return;
                }
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
    align-items: center;
    background-color: var(--color-bg-main);
}
.auth-form__title {
    color: var(--color-fg-main);
    text-align: center;
}
.input-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.action-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>