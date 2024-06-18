<template>
    <!-- Timepicker Для выбора времени -->
    <div class="time-picker">
        <div class="time-picker__header">
            <h2 class="top-title">Выбор времени</h2>
            <h1 class="time-picker__title">Ввод времени</h1>
        </div>
        <div class="timepicker-body">
            <!-- Выбор часов-->
            <div class="timepicker-body__selector">
                <!-- UP -->
                <button
                class="btn-selector"
                @click="hourUp"
                >
                    <v-icon icon="mdi-chevron-up"></v-icon>
                </button>

                <!-- TIME INPUT -->
                <input
                class="input-selector"
                type="text" 
                :placeholder="'00'"
                :value="selectedHour"
                v-maska:[maskTemplate]  
                @input="(e) => selectHour(e)"
                ref="hourInput"
                >
                </input>


                <!-- DOWN -->
                <button
                class="btn-selector"
                @click="hourDown"
                >
                    <v-icon icon="mdi-chevron-down"></v-icon>
                </button>
            </div>

            <h1 style="font-size: 3rem;">:</h1>

            <!-- Выбор минут -->
            <div class="timepicker-body__selector">
                <!-- UP -->
                <button
                class="btn-selector"
                @click="minuteUp"
                >
                <v-icon icon="mdi-chevron-up"></v-icon>
                </button>

                <!-- TIME INPUT -->
                <input
                class="input-selector"
                type="text" 
                :placeholder="'00'"
                :value="selectedMinute"
                v-maska:[maskTemplate]  
                @input="(e) => selectMinutes(e)"
                ref="minutesInput"
                >
                </input>


                <!-- DOWN -->
                <button
                class="btn-selector"
                @click="minuteDown"
                >
                    <v-icon icon="mdi-chevron-down"></v-icon>
                </button>
            </div>
        </div>
        <div class="timepicker-body__actions">

            <!-- ВЫБРАТЬ -->
            <!-- <button 
            class="timepicker-body__confirm"
            :disabled="selectedHour === null || selectedMinute === null"
            @click="selectTime"
            >
                Выбрать
            </button> -->

            <!-- СБРОСИТЬ ИЗМЕНЕНИЯ -->
            <!-- <button
            class="timepicker-body__reset"
            @click="resetChanges"
            >
                reset
            </button> -->
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            selectedHour: '00',
            selectedMinute: '00',
            maskTemplate: { mask: '##' },
        }
    },
    props: {
        isOpenTimePicker: {
            type: Boolean,
            default: false,
            required: false,
        }
    },  
    emits: ['selectTime'],
    methods: {
        resetChanges() {
            this.selectedHour = '00';
            this.selectedMinute = '00';
        },
        selectTime() {
            try {
                if (this.selectedHour !== null || this.selectedMinute !== null) {
                    const readyTime = `${this.selectedHour}:${this.selectedMinute}`;
                    this.$emit('selectTime', readyTime);
                } else return;
            } catch (err) {
                throw new Error(`selectTime => ${err}`);
            }
        },
        // Обработчик ввода часов
        selectHour(event) {
            let value = +event.target.value;
            if(value <= 0) {
                return this.selectedHour = '00';
            }
            if(value < 10) {
                return this.selectedHour = `0${value}`;
            }
            if(value > 23) {
                return this.selectedHour = '23';
            }
            return this.selectedHour = value + '';
        },
        // Выбрать на один час больше
        hourUp() {
            if (this.selectedHour) {
                let entry = +this.selectedHour;
                entry++;
                if (entry > 23) {
                    return this.selectedHour = '00';
                }
                if (entry < 10) {
                    this.selectedHour = '0' + entry;
                }
                else if (entry >= 10) {
                    this.selectedHour = entry + '';
                }

            }
        },
        // Выбрать на один час меньше
        hourDown() {
            if (this.selectedHour) {
                let entry = +this.selectedHour;
                entry--;
                if (entry === 0) {
                    return this.selectedHour = '00';
                }
                if (entry < 0) {
                    return this.selectedHour = '23';
                }
                if (entry < 10) {
                    this.selectedHour = '0' + entry;
                }
                else if (entry >= 10) {
                    this.selectedHour = entry + '';
                }

            }
        },
        // Обработчик ввода минут
        selectMinutes(event) {
            let value = +event.target.value;
            if(value <= 0) {
                return this.selectedMinute = '00';
            }
            if(value < 10) {
                return this.selectedMinute = `0${value}`;
            }
            if(value > 59) {
                return this.selectedMinute = '59';
            }
            return this.selectedMinute = value + '';
        },

        // Выбрать на одну минуту больше
        minuteUp() {
            if (this.selectedMinute) {
                let entry = +this.selectedMinute;
                entry++;
                if (entry > 59) {
                    return this.selectedMinute = '00';
                }
                if (entry < 10) {
                    this.selectedMinute = '0' + entry;
                }
                else if (entry >= 10) {
                    this.selectedMinute = entry + '';
                }

            }
        },
        // Выбрать на одну минуту меньше
        minuteDown() {
            if (this.selectedMinute) {
                let entry = +this.selectedMinute;
                entry--;
                if (entry === 0) {
                    return this.selectedMinute = '00';
                }
                if(entry < 0) {
                    return this.selectedMinute = '59';
                }
                if (entry < 10) {
                    this.selectedMinute = '0' + entry;
                }
                else if (entry >= 10) {
                    this.selectedMinute = entry + '';
                }
            }
        }
    },
    watch: {
        selectedMinute(newValue) {
            let checkedMinutes = newValue;
            if(checkedMinutes === '') checkedMinutes = '00';
            this.$emit('selectTime', `${this.selectedHour}:${checkedMinutes}:00`);
        },
        selectedHour(newValue) {
            let checkedhours = newValue;
            if(checkedhours === '') checkedhours = '00';
            this.$emit('selectTime', `${checkedhours}:${this.selectedMinute}:00`);
        },
        isOpenTimePicker: {
            handler(newValue) {
                if(newValue === true) this.$refs.hourInput.focus();
            },
            deep: true,
        }

    },
    mounted() {
        document.addEventListener('keydown', (e) => {
            if(this.$refs.hourInput === document.activeElement) {
                if(e.key === 'ArrowUp') {
                    this.hourUp();
                }
                if(e.key === 'ArrowDown') {
                    this.hourDown();
                }
                if(e.key === 'ArrowRight') {
                    this.$refs.minutesInput.focus();
                }
            }
            if(this.$refs.minutesInput === document.activeElement) {
                if(e.key === 'ArrowUp') {
                    this.minuteUp();
                }
                if(e.key === 'ArrowDown') {
                    this.minuteDown();
                }          
                if(e.key === 'ArrowLeft') {
                    this.$refs.hourInput.focus();
                }  
            }
        })
    }
}
</script>

<style scoped>
.time-picker {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(63, 205, 94);
}
.time-picker__header {
    width: 100%;
    height: 120px;  
}
.top-title {
    text-transform: uppercase;
    font-size: 0.75rem;
    grid-area: title;
    padding-inline: 24px 12px;
    padding-top: 16px;
    padding-bottom: 16px;
    font-weight: 400;
    letter-spacing: 0.1666666667em;
}
.time-picker__title {
    height: 70px;
    align-content: end;
    padding: 0 12px 12px 24px;
    font-weight: 400;
}
.timepicker-body {
    display: flex;
    align-items: center;
    flex-grow: 2;
}
.timepicker-body__selector {
    display: flex;
    flex-direction: column;
    width: max-content;
    height: max-content;
    align-items: center;
    justify-content: center;
}
.input-selector {
    /* width: 30px !important;  */
    color: rgb(11, 94, 11);
    width: 90px;
    text-align: center;
    margin: 2px 10px;
    font-size: 3.5rem;
    padding: 0.4rem;
    background-color: rgba(63, 205, 94, .4);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 200;
    border-radius: 5px;
}
.input-selector:focus {
    outline: 2px solid rgba(34, 97, 48, 0.4);
}
.timepicker-body__actions {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem !important;
}
.timepicker-body__confirm {
    width: 60%;
}
.timepicker-body__reset {
    width: 10%;
    margin-left: 0.5rem;
}
.btn-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
}
.btn-selector:focus {
    outline: 2px solid rgba(63, 205, 94, .4);
}
</style>