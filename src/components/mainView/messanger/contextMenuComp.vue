<template>
    <div class="context-menu-overlay" v-show="isShowContextMenu" @click="$emit('close')">
        <div class="context-menu" ref="contextMenu">
            Context Menu
        </div>
    </div>

</template>

<script>
import { nextTick } from 'vue';
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false,
            requered: false,
        }
    },
    emits: ['close'],
    watch: {
        isShow(newValue) {
            if (newValue === true) {
                this.isShowContextMenu = true;
                this.initContextMenu();
            } else {
                this.isShowContextMenu = false;
            }
        }
    },
    data() {
        return {
            posCursor: {
                x: 0,
                y: 0,
            },
            isShowContextMenu: false,
        }
    },
    methods: {
        async initContextMenu() {
            await nextTick();
            const { width, height } = this.$refs.contextMenu.getBoundingClientRect();
            const widthMenu = Math.ceil(width);
            const heightMenu = Math.ceil(height);
            const vw = window.innerWidth;                           // Ширина окна
            const vh = window.innerHeight;                          // Высота окна
            let resultLeft = this.posCursor.x;                      // Итоговая позиция кон.мен с лева
            let resultTop = this.posCursor.y;                       // Итоговая позиция кон.мен с права
            let offsetRight = vw - (this.posCursor.x + widthMenu);  // Переполнение экрана кон.мен. с правой границы 
            let offsetBottom = vh - (this.posCursor.y + heightMenu);// Переполнение экрана кон.мен. с нижней границы 
            if (offsetRight < 0) {
                resultLeft = (vw - widthMenu) - 18;
            }
            if(offsetBottom < 0) {
                resultTop = (vh - heightMenu) - 18;
            }
            // Итоговая Устновка позиции контекстного меню 
            this.$refs.contextMenu.style.left = resultLeft + 'px';
            this.$refs.contextMenu.style.top = resultTop + 'px';
        }
    },
    mounted() {
        document.addEventListener('mousemove', (event) => {
            const { pageX, pageY } = event;
            this.posCursor.x = pageX;
            this.posCursor.y = pageY;
        });
    }
}
</script>

<style scoped>
.context-menu-overlay {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 999;
}

.context-menu {
    position: absolute;
    background-color: white;
    padding: 0.4rem 1.2rem;
    width: 200px;
    top: 0;
    left: 0;
    box-shadow: var(--shadow);
}
</style>