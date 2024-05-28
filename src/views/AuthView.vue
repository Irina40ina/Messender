<template>
    <div class="auth-view">
        <div class="auth-form__container">
            <h1 class="auth-form__title">Авторизация</h1>
            <!-- ФОРМА АВТОРИЗВАЦИИ (ВОЙТИ В СИСТЕМУ) -->
            <form 
            class="auth-form"
            @submit.prevent
            >
                <input 
                class="auth-form__input" 
                type="email" 
                placeholder="Введите email"
                v-model="email"
                >
                <input 
                class="auth-form__input" 
                type="password" 
                placeholder="Введите пароль"
                v-model="password"
                >
                <button 
                class="aut-form__btn"
                @click="handlerSubmit"
                >Войти</button>
            </form>
        </div>
    </div>
</template>
<script>
import { login } from '@/api/authApi.js'
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async handlerSubmit() {
            try {
               await login(this.email, this.password);
            } catch (err) {
                console.error(`views/AuthView: handlerSubmit => ${err}`)
            }
        }
    }
}
</script>
<style scoped>
.auth-view {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.auth-form__container {
    width: 600px;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);
}

.auth-form__title {
    color: var(--color-fg-main);
    text-align: center;
}

.auth-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg-main);
}

.auth-form__input {
    width: 80%;
    padding: .5rem 1rem;
    margin: .3rem;
    outline: rgba(255, 255, 255, 0);
}
.aut-form__btn {
    padding: .5rem 1rem;
    cursor: pointer;
    outline: rgba(255, 255, 255, 0);
    align-self: flex-end;
    margin-right: 3rem;
    margin-top: 1rem;
}
</style>