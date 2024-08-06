<template>
    <div class="chunk-item">
        <p class="chunk-item__key">{{ $props.item.key }}: </p>
        <p class="chunk-item__value" :class="class">
            {{ computeValue }}
            
            <!-- EDIT ICON -->
            <font-awesome-icon
            class="edit-icon"
            icon="fa-pen-to-square"
            v-if="$props.item.id !== 'created-at'"
            @click="openEditField"
            ></font-awesome-icon>
        </p>
        
        <editFieldComp
        :item="$props.item"
        @confirm-text-data="(value) => $emit('confirmTextData', value)"
        @close="closeEditField"
        />
    </div>
</template>

<script>
import editFieldComp from './editFieldComp.vue';
import gsap from 'gsap';
export default {
    components: {
        editFieldComp,
    },
    data() {
        return {
            computedValue: '',
            class: '',
        }
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    emits: ['confirmTextData', 'openDateTimePicker'],
    watch: {
        computedValue(newValue, oldValue) {
            try {
                if(newValue === 'Не указано') {
                    this.class = 'none';
                } else {
                    this.class = '';
                }
            } catch (err) {
                console.error(`components/mainView/profile/profileChunk/itemChunkComp: watch -> computedValue => ${err}`) 
            }
        },
    },
    computed: {
        computeValue() {
            try {
                if(this.$props.item.id === 'gender') {
                    if(this.$props.item.value == 0){
                        this.computedValue = 'М';
                        return 'М';
                    } 
                    if(this.$props.item.value == 1){
                        this.computedValue = 'Ж';
                        return 'Ж';
                    }
                    if(this.$props.item.value == 2){
                        this.computedValue = 'Другое';
                        return 'Другое';
                    } 
                    this.computedValue = 'Не указано';
                    return 'Не указано';
                }
                if(this.$props.item.value == null){
                    this.computedValue = 'Не указано';
                    return 'Не указано'
                } else {
                    this.computedValue = this.$props.item.value;
                    return this.$props.item.value;
                }
            } catch (err) {
                console.error(`components/mainView/profile/profileChunk/itemChunkComp: computed -> computeValue => ${err}`)
            }
        },
        
    },
    methods: {
        openEditField() {
            try {
                if(this.$props.item.id === 'birth-at'){
                    return this.$emit('openDateTimePicker');
                }
                gsap.to(`#edit-field__${this.$props.item.id}`, { duration: .3, right: 0 });
            } catch (err) {
                console.error(`components/mainView/profile/profileChunk/itemChunkComp: openEditField => ${err}`)
            }
        },
        closeEditField() {
            try {
                gsap.to(`#edit-field__${this.$props.item.id}`, { duration: .3, right: '-100%' });
            } catch (err) {
                console.error(`components/mainView/profile/profileChunk/itemChunkComp: closeEditField => ${err}`)
            }
        }
    },
}
</script>

<style scoped>
    .chunk-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-self: stretch;
        height: 50px;
        padding: 0 1.5rem;
        overflow: hidden;
        font-size: 1.3rem;
    }
    .chunk-item + .chunk-item {
        border-top: 2px dashed var(--default-bg);
    }
    .chunk-item__key {
    }
    .chunk-item__value {
        width: 40%;
        position: relative;
        display: flex;
        align-items: center;
        color: var(--color-fg-chunk);
    }
    .edit-icon {
        position: absolute;  
        right: 0; 
        color: var(--color-fg-chunk);
        cursor: pointer;
        z-index: 10;
        transition: all .4s ease;
    }
    .edit-icon:hover {
        color: var(--primary-fg);
        transition: all .4s ease;
    }
    .chunk-item__value.none {
        font-style: italic;
        color: gray;
    }
</style>