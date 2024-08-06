<template>
    <button class="btn">
        <slot></slot>
    </button> 
</template>
<script>
export default {
    name: 'btnComp',
}
</script>
<style scoped>
.btn {
    padding: .5rem 1rem;
    cursor: pointer;
    outline: rgba(255, 255, 255, 0);
    align-self: flex-end;
    border: 1px solid var(--primary-fg);
    border-radius: 5px;
    box-shadow: var(--shadow);
    transition: all .2s ease;
    color: var(--primary-fg);
}
.btn:active {
    box-shadow: none;
    transition: all .2s ease;
}
</style>