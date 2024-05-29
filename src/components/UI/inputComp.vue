<template>
    <input
    class="input"
    :type="$props.type"
    :placeholder="$props.placeholder"
    @input="(event) => $emit('update:modelValue', event.target.value)"
    >
</template>
<script>
export default {
    name: 'inputComp',
    props: {
        placeholder: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    emits: ['update:modelValue'],
}
</script>
<style scoped>
    .input {
        width: 80%;
        padding: .5rem 1rem;
        margin: .7rem;
        outline: rgba(255, 255, 255, 0);
    }
</style>