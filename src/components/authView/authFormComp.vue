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
            :type="computeTypePassword"
            placeholder="Введите пароль"
            v-model="password"
            ></inputComp>
            <font-awesome-icon class="icon-pw" :icon="['fas', 'eye']" @click="showPassword" />
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
            isShowPassword: false,
        }
    },
    emits: ['dataSubmit', 'isShow'],
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
                if(isValidEmail(this.email) === true && isValidPassword(this.password) === true) {
                    console.log(isValidEmail(this.email), isValidPassword(this.password)) 
                    await login(this.email, this.password);
                    this.$router.push({ name: 'main' });
                } else {
                    this.$router.push({ name: 'logup' });
                }
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
        window.addEventListener('keydown', async (e) => {
            if(e.key === 'Enter') {
                try {
                if(isValidEmail(this.email) === true && isValidPassword(this.password) === true) { 
                    await login(this.email, this.password);
                    this.$router.push({ name: 'main' });
                } else {
                    this.$router.push({ name: 'logup' });
                }
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
.icon-pw {
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    top: 66%;
    right: 2%;
    cursor: pointer;
}
.action-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>