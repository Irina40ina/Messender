<template>
    <div class="auth-view">
        <div class="auth-form__container">
            <!-- ФОРМА АВТОРИЗВАЦИИ (ВОЙТИ В СИСТЕМУ) -->
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { login } from '@/api/authApi.js'
import authFormComp from '@/components/authView/authFormComp.vue';
import regFormComp from '@/components/authView/regFormComp.vue';
export default {
    components: {
        authFormComp,
        regFormComp,
    },
    data() {
        return {
            isShow: false,
        }
    },
    methods: {
        async handlerSubmit(email, password) {
            try {
               await login(email, password);
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

</style>