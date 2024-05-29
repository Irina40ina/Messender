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
        /* margin-right: 3rem; */
        margin-top: 1rem;
    }
</style>