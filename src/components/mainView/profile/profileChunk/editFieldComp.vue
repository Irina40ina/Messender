<template>
    <div 
    :id="`edit-field__${$props.item.id}`"
    class="edit-field"
    >
        <editRadioFormComp
        :item="$props.item"
        @confirm-text-data="(value) => $emit('confirmTextData', value)"
        @close="$emit('close')"
        v-if="$props.item.id === 'gender'"
        ></editRadioFormComp>

        <editTextFormComp
        :item="$props.item"
        @confirm-text-data="(value) => $emit('confirmTextData', value)"
        @close="$emit('close')"
        v-else
        ></editTextFormComp>


    </div>
</template>

<script>
import editTextFormComp from './editTextFormComp.vue';
import editRadioFormComp from './editRadioFormComp.vue';
export default {
    components: {
        editTextFormComp,
        editRadioFormComp,
    },
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    emits: ['confirmTextData', 'close'],
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
    background-color: rgb(228, 228, 228);
    z-index: 12;
}
</style>