<template>
    <form 
    class="reg-form"
    @submit.prevent
    >
        <h1 class="auth-form__title">Регистрация</h1>
        <div class="input-block">
            <div class="input-group">
               <inputComp
                class="input-block__item"
                :type="'text'"
                :placeholder= "'Введите Имя'"
                v-model="firstName"
                ></inputComp> 
                <span class="errorText" :class="isNameError? 'visible' : ''">Введите корректное имя</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="'text'" 
                :placeholder= "'Введите Фамилию'"
                v-model="lastName"
                ></inputComp>
                <span class="errorText" :class="isLastnameError? 'visible' : ''">Введите корректную фамилию</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="'email'" 
                :placeholder= "'Введите email'"
                v-model="email"
                ></inputComp>
                <span class="errorText" :class="isEmailError? 'visible' : ''">Введите корректный email</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="computeTypePassword" 
                placeholder="Введите пароль"
                v-model="password"
                @focus="isOpenedPasswordCheck = false"
                ></inputComp>
                <span class="errorText" :class="isPasswordError? 'visible' : ''">Введите корректный пароль</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="computeTypePasswordCheck" 
                placeholder="Введите пароль ещё раз"
                v-model="passwordCheck"
                @focus="isOpenedPassword = false"
                ></inputComp>
                <span class="errorText" :class="isPasswordCheckError? 'visible' : ''">Пароли не совпадают</span>
            </div>
            <font-awesome-icon class="icon-open-eye1" :class="isOpenedPassword? 'unvisible' : ''" :icon="['fas', 'eye']" @click="isOpenedPassword = true" />
            <font-awesome-icon class="icon-open-eye2" :class="isOpenedPasswordCheck? 'unvisible' : ''" :icon="['fas', 'eye']" @click="isOpenedPasswordCheck = true" />
           
            <font-awesome-icon class="icon-close-eye1" :class="isOpenedPassword? 'visible' : ''" :icon="['fas', 'eye-slash']" @click="isOpenedPassword = false" />
            <font-awesome-icon class="icon-close-eye2" :class="isOpenedPasswordCheck? 'visible' : ''" :icon="['fas', 'eye-slash']" @click="isOpenedPasswordCheck = false" />
        </div>
        
        <div class="action-block">
            <btnComp @click="$router.push({ name: 'login' })">Назад</btnComp>
            <btnComp @click="handlerLogup">Подтвердить</btnComp>
        </div>
    </form>
</template>
<script>
import { logup } from "@/api/authApi"
import { isValidEmail, isValidPassword, hasSpecSymbols } from '@/utils/validation';
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordCheck: '',
            isOpenedPassword: false,
            isOpenedPasswordCheck: false,
            isNameError: false,
            isLastnameError: false,
            isEmailError: false,
            isPasswordError: false,
            isPasswordCheckError: false,
        }
    },
    computed: {
        computeTypePassword() {
            try {
                if(this.isOpenedPassword === false) {
                    return 'password'
                } else if(this.isOpenedPassword === true) {
                    return 'text'
                }
            } catch (err) {
                console.error(`components/authView/authFormComp.vue: computeTypePassword  => ${err}`)
            }
        },
        computeTypePasswordCheck() {
            try {
                if(this.isOpenedPasswordCheck === false) {
                    return 'password'
                } else if(this.isOpenedPasswordCheck === true) {
                    return 'text'
                }
            } catch (err) {
                console.error(`components/authView/authFormComp.vue: computeTypePassword  => ${err}`)
            }
        },
    },
    methods: {
        async handlerLogup() {
            try {
                if(this.firstName !== '' && hasSpecSymbols(this.firstName) === true) {
                    this.isNameError = false;
                } else {
                    this.isNameError = true
                    return;
                }
                if(this.lastName !== '' && hasSpecSymbols(this.lastName) === true) {
                    this.isLastnameError = false;
                } else {
                    this.isLastnameError = true;
                    return;
                }
                if(isValidEmail(this.email) === true) {
                    this.isEmailError = false;
                } else {
                    this.isEmailError = true;
                    return;
                }
                if(isValidPassword(this.password) === true) {
                    this.isPasswordError = false;
                } else {
                    this.isPasswordError = true;
                    return;
                }
                if(isValidPassword(this.passwordCheck) === true && this.password === this.passwordCheck) {
                    this.isPasswordCheckError = false;
                } else {
                    this.isPasswordCheckError = true;
                    return;
                }
                await logup(this.firstName, this.lastName, this.email, this.password); 
            } catch (err) {
                console.error(`components/authView/regFormComp.vue: handlerLogup  => ${err}`)
            }              
        },
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: auto;
}
.input-group {
    padding: 1rem 0;
    position: relative;
    min-width: 100%;
    width: max-content;
    height: max-content;
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
.icon-open-eye1 {
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 67%;
    right: 2%;
    cursor: pointer;
}
.icon-open-eye1.unvisible{
    display: none;
}
.icon-open-eye2 {
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 87%;
    right: 2%;
    cursor: pointer;
}
.icon-open-eye2.unvisible{
    display: none;
}
.icon-close-eye1 {
    display: none;
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 67%;
    right: 2%;
    cursor: pointer;
}
.icon-close-eye1.visible{
    display: block;
}
.icon-close-eye2 {
    display: none;
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 87%;
    right: 2%;
    cursor: pointer;
}
.icon-close-eye2.visible{
    display: block;
}
.errorText {
    position: absolute; 
    left: 0; 
    bottom: 1rem;
    background-color: var(--color-bg-main);
    color: rgb(224, 53, 53);
    z-index: -1 !important;
    margin-left: 0.4rem;
    transition: all 0.5s ease;
    opacity: 0;
}
.errorText.visible {
    bottom: -.7rem;
    opacity: 1;
    transition: all 0.5s ease;
}
</style>