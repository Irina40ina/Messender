<template>
    <form 
    class="reg-form"
    @submit.prevent
    >
        <h1 class="auth-form__title">Регистрация</h1>
        <div class="input-block">
            <inputComp
            class="input-block__item"
            :type="'text'"
            :placeholder= "'Введите Имя'"
            v-model="firstName"
            ></inputComp>
            <inputComp
            class="input-block__item"
            :type="'text'" 
            :placeholder= "'Введите Фамилию'"
            v-model="lastName"
            ></inputComp>
            <inputComp
            class="input-block__item"
            :type="'email'" 
            :placeholder= "'Введите email'"
            v-model="email"
            ></inputComp>
            <inputComp
            class="input-block__item"
            type="password" 
            placeholder="Введите пароль"
            v-model="password"
            ></inputComp>
        </div>
        
        <div class="action-block">
            <btnComp @click="$router.push({ name: 'login' })">Назад</btnComp>
            <btnComp @click="handlerLogup">Подтвердить</btnComp>
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
            try {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
            } catch (err) {
                console.error(`components/authView/regFormComp.vue: validateEmail  => ${err}`)
            }
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
    align-items: stretch;
    background-color: var(--color-bg-main);
    z-index: 10;
    padding: 2rem 5rem;
}
.input-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: auto;
}
.auth-form__title {
    margin-bottom: auto;
    color: var(--primary-fg);
    font-family: var(--font);
    text-align: center;
}
.input-block__item {
    width: 100% !important;
}
.action-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>