<template>
    <div class="message-widget">
        <div class="message-content">
            <wraperMessageComp
            :arr-messages="arrMessages"
            ></wraperMessageComp>
        </div>
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
    .message-content {
        width: 100%;
        height: 85%;
        overflow: auto;
    }
    .input-message-panel {
        height: 15%;
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
    }
</style>