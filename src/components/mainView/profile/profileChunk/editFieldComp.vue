<template>
    <div 
    :id="`edit-field__${$props.item.id}`"
    class="edit-field"
    >
        <editTextFormComp
        :item="$props.item"
        @confirm="(value) => $emit('confirm', value)"
        @close="$emit('close')"
        ></editTextFormComp>
    </div>
</template>

<script>
import editTextFormComp from './editTextFormComp.vue';
export default {
    components: {
        editTextFormComp,
    },
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    emits: ['confirm', 'close'],
}
</script>

<style scoped>
.edit-field {
    position: absolute;
    right: -100%;
    display: flex;
    /* align-self: stretch; */
    /* justify-content: space-between; */
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 1.1rem;
    background-color: var(--color-bg-main);
    z-index: 12;
}
</style>