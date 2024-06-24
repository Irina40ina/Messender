<template>
    <form 
    class="edit-text-form"
    @submit.prevent>
        <input type="text"
        v-model="textInput"
        class="edit-text-form__input"
        :placeholder="`${$props.item.key}`"
        ref="editFieldInput"
        >

        <!-- CONFIRM -->
        <button 
        class="edit-text-form__btn confirm"
        @click="confirm"
        >
            <font-awesome-icon
            class="icon"
            icon="fa-check"
            ></font-awesome-icon> 
        </button>

        <!-- RESET -->
        <button 
        class="edit-text-form__btn reset"
        @click="reset"
        >
            <font-awesome-icon
            class="icon"
            icon="fa-rotate-left"
            ></font-awesome-icon> 
        </button>

        <!-- CLOSE -->   
        <button 
        class="edit-text-form__btn close"
        @click="close"
        >
            <font-awesome-icon
            class="icon"
            icon="fa-xmark"
            ></font-awesome-icon>
        </button>
    </form> 
</template> 

<script>
import { animationFadeText } from '@/utils/animationUtils';
import Inputmask from 'inputmask';
import { useMainStore } from '@/store/mainStore';
export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    emits: [ 'confirmTextData', 'close', ],
    data() {
        return {
            textInput: '',
        }
    },
    methods: {
        confirm() {
            if(this.$props.item.id === 'phone-number') {
                const readyNumber = useMainStore().resetPhoneNumberMask(this.textInput);
                this.$emit('confirmTextData', readyNumber);
                return this.textInput = '';
            }
            this.$emit('confirmTextData', this.textInput);
            this.textInput = '';
        },
        reset() {
            animationFadeText(this.textInput, (result) => {
                this.textInput = result;
            });
        },
        close() {
            this.$emit('close');
        },
    },
    mounted() {
        if(this.$props.item.id === 'phone-number') {
            Inputmask({ mask: '+7 (999) 999-99-99' }).mask(this.$refs.editFieldInput);
        }
    }
}
</script>

<style scoped>
.edit-text-form {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    align-self: stretch;
}
.edit-text-form__input {
    width: 75%;
    height: 100%;
    font-family: var(--font);
    background-color: var(--color-bg-input);
    font-size: medium;
    padding: 0 1.5rem;
    outline: rgba(0,0,0,0);
}
.edit-text-form__btn {
    width: 8%;
    height: 100%;
    background-color: var(--color-bg-input);
    border: none;
    outline: rgba(0,0,0,0);
    cursor: pointer;
    font-size: 1.1rem;
    transition: all .6s ease;
}
.edit-text-form__btn.confirm {
    color: green;
}
.edit-text-form__btn.reset {
    color: orange;
}
.edit-text-form__btn.close {
    color: red;
}

.edit-text-form__btn:hover {
    transition: all .6s ease;
    background-color: rgba(128, 128, 128, 0.35);
}

.edit-text-form__btn:hover .icon {
    transition: all .3s ease;
    transform: rotate(-360deg);
}
</style>