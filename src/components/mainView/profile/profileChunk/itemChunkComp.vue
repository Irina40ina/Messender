<template>
    <div class="chunk-item">
        <p class="chunk-item__key">{{ $props.item.key }}: </p>
        <p class="chunk-item__value" :class="(this.$props.item.value)? '': 'none'">
            {{ computeValue }}
            
            <!-- EDIT ICON -->
            <font-awesome-icon 
            class="edit-icon"
            icon="fa-pen-to-square"
            @click="openEditField"
            ></font-awesome-icon>
        </p>
        
        <editFieldComp
        :item="$props.item"
        @confirm=""
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
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        computeValue() {
            return this.$props.item.value ?? 'Не указано';
        }
    },
    methods: {
        openEditField() {
            gsap.to(`#edit-field__${this.$props.item.id}`, { duration: .3, right: 0 });
        },
        closeEditField() {
            gsap.to(`#edit-field__${this.$props.item.id}`, { duration: .3, right: '-100%' });
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