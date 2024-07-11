<template>
    <div class="context-menu__overlay"
    @click="$emit('close')"
    v-show="isShowContextMenu"
    >
        <div class="context-menu__content" 
        @click.stop
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
import gsap from "gsap"
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            isShowContextMenu: false,
            width: 0,
            height: 0,
        }
    },
    emits: ['close'],
    watch: {
        isShow: {
            handler(newValue) {
                if(newValue === true) {
                    this.isShowContextMenu = true;
                    gsap.to('.context-menu__overlay', { duration: 0.3, opacity: 1 });
                    gsap.to('.context-menu__content', { duration: 0.4, scale: 1 });
                    
                } else {
                    gsap.to('.context-menu__overlay', { duration: 0.3, opacity: 0 });
                    gsap.to('.context-menu__content', { duration: 0.4, scale: 0 });
                        .then(() => {
                            this.isShowContextMenu = false;
                        })
                }
            }
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped>
   .context-menu__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
    backdrop-filter: blur(2px);
    opacity: 0;
    z-index: 1000;
   } 
   .context-menu__content {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 200px;
    min-height: 80px;
    width: max-content;
    height: max-content;
    max-width: 80%;
    max-height: 80%;
    background-color: var(--color-bg-main);
    box-shadow: var(--shadow);
    overflow: auto;
    scale: 0;
    border-radius: 5px;
   }
</style>