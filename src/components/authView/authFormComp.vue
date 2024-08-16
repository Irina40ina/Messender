<template>
    <form 
    class="auth-form"
    @submit.prevent
    > 
        <h1 class="auth-form__title">Авторизация</h1>
        <div class="input-block" >
            <!-- E-mail -->
            <div class="input-group">
                <inputComp  
                style="width: 100%"
                :type="'email'" 
                :placeholder= "'Введите email'"
                v-model.trim="email"
                ></inputComp>
                <span class="errorText" :class="isEmailError? 'visible' : ''">Email не верный</span>
            </div>
            <!-- Password -->
            <div class="input-group">
                <inputComp 
                style="width: 100%"
                :type="computeTypePassword"
                placeholder="Введите пароль"
                v-model.trim="password"
                ></inputComp>
                <span class="errorText" :class="isPasswordError? 'visible' : ''">Пароль не верный</span>
            </div>
            <font-awesome-icon class="icon-open-eye" :class="isOpenedPassword? 'unvisible' : ''" :icon="['fas', 'eye']" @click="isOpenedPassword = true" />
            <font-awesome-icon class="icon-close-eye" :class="isOpenedPassword? 'visible' : ''" :icon="['fas', 'eye-slash']" @click="isOpenedPassword = false" />
        </div>
        
        <div class="action-block">
            <btnComp @click.prevent="$router.push({ name: 'logup' })">Регистрация</btnComp>
            <btnComp @click.prevent="handlerLogin">Войти</btnComp>
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
            isOpenedPassword: false,
            isEmailError: false,
            isPasswordError: false,
        }
    },
    emits: ['dataSubmit', 'isShow'],
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
        }
    },
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
                const resultValidationEmail = isValidEmail(this.email);
                const resultValidationPassword = isValidPassword(this.password);
                if(resultValidationEmail === true && resultValidationPassword === true) {
                    await login(this.email, this.password);
                    this.$router.push({ name: 'main' });
                } 
                if(!resultValidationEmail) {
                    this.isEmailError = true;
                } else this.isEmailError = false;

                if(!resultValidationPassword) {
                    this.isPasswordError = true;
                } else this.isPasswordError = false;
            } catch (err) {
                console.error(`components/authView/authFormComp.vue: handlerLogin  => ${err}`)
            }
        },
        showPassword() {
            try {
                if(this.isShowPassword === false) {
                    this.isShowPassword = true
                } else if(this.isShowPassword === true) {
                    this.isShowPassword = false
                }
            } catch (err) {
                console.error(`components/authView/authFormComp.vue: showPassword  => ${err}`)
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                try {
                    this.handlerLogin();
                } catch (err) {
                    console.error(`components/authView/authFormComp.vue: mounted -> keydownEnter  => ${err}`)
                }
            }
        })
    }
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: auto;
}
.input-group {
    padding: 1rem 0;
    position: relative;
    min-width: 100%;
    width: max-content;
    height: max-content;
    z-index: 2 !important;
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
.icon-open-eye {
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 66%;
    right: 2%;
    cursor: pointer;
    z-index: 10;
}
.icon-open-eye.unvisible{
    display: none;
}
.icon-close-eye {
    display: none;
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 66%;
    right: 2%;
    cursor: pointer;
    z-index: 10;
}
.icon-close-eye.visible{
    display: block;
}
.action-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
@keyframes slideDown {
    from {
        bottom: 0;
    }
    to {
        bottom: -10px;
    }
}
</style>