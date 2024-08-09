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
                <span class="errorText">TEEXT ERROR</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="'text'" 
                :placeholder= "'Введите Фамилию'"
                v-model="lastName"
                ></inputComp>
                <span class="errorText">TEEXT ERROR</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="'email'" 
                :placeholder= "'Введите email'"
                v-model="email"
                ></inputComp>
                <span class="errorText">TEEXT ERROR</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="computeTypePassword" 
                placeholder="Введите пароль"
                v-model="password"
                @focus="isShowPasswordCheck = false"
                ></inputComp>
                <span class="errorText">TEEXT ERROR</span>
            </div>
            <div class="input-group">
                <inputComp
                class="input-block__item"
                :type="computeTypePasswordCheck" 
                placeholder="Введите пароль ещё раз"
                v-model="passwordCheck"
                @focus="isShowPassword = false"
                ></inputComp>
                <span class="errorText">TEEXT ERROR</span>
            </div>
            <font-awesome-icon class="icon-pw1" :icon="['fas', 'eye']" @click="showPassword" />
            <font-awesome-icon class="icon-pw2" :icon="['fas', 'eye']" @click="showPasswordCheck" />
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
            isShowPassword: false,
            isShowPasswordCheck: false,
        }
    },
    computed: {
        computeTypePassword() {
            try {
                if(this.isShowPassword === false) {
                    return 'password'
                } else if(this.isShowPassword === true) {
                    return 'text'
                }
            } catch (err) {
                console.error(`components/authView/authFormComp.vue: computeTypePassword  => ${err}`)
            }
        },
        computeTypePasswordCheck() {
            try {
                if(this.isShowPasswordCheck === false) {
                    return 'password'
                } else if(this.isShowPasswordCheck === true) {
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
                if(
                    this.firstName !== '' && 
                    hasSpecSymbols(this.firstName) === true &&
                    this.lastName !== '' && 
                    hasSpecSymbols(this.lastName) === true &&
                    isValidEmail(this.email) === true && 
                    isValidPassword(this.password) === true && 
                    isValidPassword(this.passwordCheck) === true &&
                    this.password === this.passwordCheck
                ) {
                    console.log('Запрос на сервер');
                    // await logup(this.firstName, this.lastName, this.email, this.password); 
                } 
                else {
                    console.log('ELSE');
                    return;
                }
            } catch (err) {
                console.error(`components/authView/regFormComp.vue: handlerLogup  => ${err}`)
            }              
        },
        showPassword() {
            try {
                if(this.isShowPassword === false) {
                    this.isShowPassword = true;
                } else if(this.isShowPassword === true) {
                    this.isShowPassword = false;
                }
            } catch (err) {
                console.error(`components/authView/regFormComp.vue: showPassword  => ${err}`)
            }
        },
        showPasswordCheck() {
            try {
                if(this.isShowPasswordCheck === false) {
                    this.isShowPasswordCheck = true;
                } else if(this.isShowPasswordCheck === true) {
                    this.isShowPasswordCheck = false;
                }
            } catch (err) {
                console.error(`components/authView/regFormComp.vue: showPassword  => ${err}`)
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
.icon-pw1 {
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 67%;
    right: 2%;
    cursor: pointer;
}
.icon-pw2 {
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 87%;
    right: 2%;
    cursor: pointer;
}
</style>