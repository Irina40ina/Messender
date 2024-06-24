<template>
    <form class="edit-radio-form"
    @submit.prevent
    >
        <div class="edit-radio-form__options">
            
            <input 
            class="edit-radio-form__input" 
            type="radio" 
            id="radio-input__0"
            value="0"
            v-model="selectedGender"
            >
            <label for="radio-input__0">М</label>

            <input 
            class="edit-radio-form__input" 
            type="radio" 
            id="radio-input__1"
            value="1"
            v-model="selectedGender"
            >
            <label for="radio-input__1">Ж</label>
            
            <input 
            class="edit-radio-form__input" 
            type="radio" 
            id="radio-input__2"
            value="2"
            v-model="selectedGender"
            >
            <label for="radio-input__2">Другое</label>
            
        </div>
        <div class="edit-radio-form__actions">

            <!-- CONFIRM -->
            <button 
            class="edit-radio-form__btn confirm"
            @click="confirm"
            >
                <font-awesome-icon
                class="icon"
                icon="fa-check"
                ></font-awesome-icon> 
            </button>

            <!-- RESET -->
            <button 
            class="edit-radio-form__btn reset"
            @click="reset"
            >
                <font-awesome-icon
                class="icon"
                icon="fa-rotate-left"
                ></font-awesome-icon>
            </button>

            <!-- CLOSE -->   
            <button 
            class="edit-radio-form__btn close"
            @click="close"
            >
                <font-awesome-icon
                class="icon"
                icon="fa-xmark"
                ></font-awesome-icon>
            </button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            selectedGender: null,
        }
    },
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    emits: ['selectGender', 'close'],
    created() {
        this.filledSelectedGender();
    },
    methods: {
        reset() {
            this.selectedGender = null;
            this.filledSelectedGender();
        },
        filledSelectedGender(){
            if(this.$props.item.value !== null){
                this.selectedGender = this.$props.item.value;
            } else if(this.$props.item.value === null) {
                return this.selectedGender;
            }
        },
        close() {
            this.$emit('close');
        },
    }
}
</script>

<style scoped>
    .edit-radio-form{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
    }
    .edit-radio-form__options {
        display: flex;
        align-items: center;
        margin-right: auto;
    }
    .edit-radio-form__actions {
        width: 15%;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
    }
    .edit-radio-form__btn {
        width: 33%;
        height: 100%;
        background-color: var(--color-bg-input);
        border: none;
        outline: rgba(0,0,0,0);
        cursor: pointer;
        font-size: 1.1rem;
        transition: all .6s ease;
    }
    .edit-radio-form__btn.confirm {
        color: green;
    }
    .edit-radio-form__btn.reset {
        color: orange;
    }
    .edit-radio-form__btn.close {
        color: red;
    }

    .edit-radio-form__btn:hover {
        transition: all .6s ease;
        background-color: rgba(128, 128, 128, 0.35);
    }

    .edit-radio-form__btn:hover .icon {
        transition: all .3s ease;
        transform: rotate(-360deg);
    }
    .edit-radio-form__input {
        display: none;
    }
    .edit-radio-form__input + label {
        display: inline-block;
        position: relative;
        padding-left: 25px;
        cursor: pointer;
    }
    .edit-radio-form__input + label::before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 1px solid var(--colorful-bg);
        border-radius: 50%;
        margin-right: .5rem;
    }
    .edit-radio-form__input:checked + label::before {
        background-color: var(--colorful-bg);
    }
</style>