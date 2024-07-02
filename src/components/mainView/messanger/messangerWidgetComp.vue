<template>
    <div class="message-widget">
        
        <!-- Header -->
        <div class="message-header">
            <div class="message-user__avatar">
                <p class="avatar-stub">{{ 'HH' }}</p>
            </div> 
            <div class="message__users-name-container">
                <p class="users__name">{{ 'Harry Potter' }}</p>
            </div>
        </div>

        <!-- Content -->
        <div class="message-content">
            <wraperMessageComp
            :arr-messages="arrMessages"
            ></wraperMessageComp>
        </div>

        <!-- Input Panel -->
        <div class="input-message-panel">
            <textarea 
                name="input-message"
                id="input-message" 
                placeholder="Введите сообщение"
                @input="(e) => message = e.target.value"
                :value="message"
                ></textarea>
           
        </div>
    </div>
</template>

<script>
import wraperMessageComp from './wraperMessageComp.vue';
export default {
    components: {
        wraperMessageComp,
    },
    data() {
        return {
            message: '',
            arrMessages: [],
        }
    },
    methods: {
        sendMessage(text){
            let obj = {
                id: Date.now(),
                value: text,
            }
            this.arrMessages.push(obj);
        }
    },
    mounted() {
        {
            const textarea = document.getElementById('input-message');
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if(this.message != ''){
                        this.sendMessage(this.message);
                    }
                    this.message = '';
                }
            })
        }
    }
}

</script>

<style scoped>
    .message-widget {
        width: 80%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #9fce9f;
    }
    .message-header {
        width: 100%;
        height: 5%;
        background-color: var(--color-bg-main);
        display: flex;
        align-items: center;
        padding: .3rem 2rem;
        border-bottom: 1px solid var(--primary-fg-light);
    }
    
    .message-user__avatar {
        left: 5%;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .5rem;
    }
    .avatar-stub {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        font-family: var(--font);
        font-weight: bolder;
    }
    .message__users-name-container {
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        position: relative;
    }
    .users__name {
        font-size: 16px;
        font-family: var(--font);
    }
    .message-content {
        width: 100%;
        height: 85%;
        overflow: auto;
    }
    .input-message-panel {
        height: 10%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    #input-message {
        width: 90%;
        height: 90%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: -10px -6px 10px -3px rgba(81,  115,  81, 0.5);
        outline: rgba(255, 255, 255, 0);
        resize: none;
        padding: 0.5rem 1rem;
        box-shadow: var(--shadow);
    }
</style>