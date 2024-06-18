<template>
    <div class="date-time-picker__container">
        <div class="date-time-picker__wraper">
            
            <!-- DatePicker -->
            <v-date-picker 
            show-adjacent-months
            class="date-picker"
            >
            </v-date-picker>
            
            <!-- TimePicker -->
            <timePickerComp 
            class="time-picker"
            />
        </div>
        <div class="date-time-picker__actions">
            <button class="actions-btn">Подтвердить</button>
            <button class="actions-btn"
            @click="toggleMode"
            >{{ computeNameSelect }}</button>
        </div>
    </div>
</template>

<script>
import timePickerComp from './timePickerComp.vue';
import gsap from 'gsap';
export default {
    components: {
        timePickerComp,
    },
    data() {
        return {
            selectionMode: 'date', // date | time
        }
    },
    computed: {
        computeNameSelect() {
            if(this.selectionMode == 'date') {
                return 'Выберите время'
            } else if(this.selectionMode == 'time') {
                return 'Выберите дату'
            }
        }
    },
    methods: {
        toggleMode() {
            if(this.selectionMode === 'date') {
                this.selectionMode = 'time';
                gsap.to('.date-picker', { duration: .2, left: '-100%' });
                gsap.to('.time-picker', { duration: .2, right: 0 });
            } else if(this.selectionMode === 'time') {
                this.selectionMode = 'date';
                gsap.to('.time-picker', { duration: .2, right: '-100%' });
                gsap.to('.date-picker', { duration: .2, left: 0 });
            }
        }
    }
}
</script>

<style scoped>
    .date-time-picker__container {
        position: relative;
        width: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--color-bg-main);
        overflow: hidden;
    }
    .date-time-picker__wraper {
        display: flex;
        position: relative;
    }
    .date-time-picker__actions {
        display: flex;
        align-items: center;
        width: 100%;
        background-color: var(--color-bg-main);
        border-top: 1px solid var(--timepicker-border);
        padding: 0 .2rem;
    }
    .actions-btn{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-grow: 1;
        margin: .1rem;
        font-size: 1rem;
        padding: .2rem 0;
        border-radius: 1px;
        background-color: var(--timepicker-bg);
        transition: all .4s ease;
    }
    :hover.actions-btn {
        transition: all .4s ease;
        background-color: rgba(63, 205, 94, .4);
    }
    .date-picker {
        position: relative;
        width: 100%;
        left: 0;
        color: var(--timepicker-fg);

    }
    .time-picker {
        position: absolute;
        right: -100%;
    }
</style>