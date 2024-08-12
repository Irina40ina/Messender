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
    outline: rgba(255, 255, 255, 0);
    border: 1px solid var(--primary-fg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    transition: all .3s ease;
    z-index: 5 !important;
    background-color: #fff;
}
.input:focus {
    box-shadow: none;
    transition: all .3s ease;
}
</style>