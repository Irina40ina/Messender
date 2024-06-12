<template>
    <div class="primary-dialog__overlay"
    @click="$emit('close')"
    v-show="$props.isShow"
    >
        <div class="primary-dialog__content">
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['close']
}
</script>
<style scoped>
.primary-dialog__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right:0 ;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
    backdrop-filter: blur(2px);
    z-index: 1000;

}

.primary-dialog__content {
    position: relative;
    min-width: 200px;
    min-height: 100px;
    width: max-content;
    height: max-content;
    max-width: 80%;
    max-height: 80%;
    background-color: var(--color-bg-main);
    overflow: auto;
}
</style>