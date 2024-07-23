<template>
    <div 
    class="context-menu-overlay" 
    v-show="isShowContextMenu" 
    @click="$emit('close')"
    >
        <div class="context-menu" ref="contextMenu">
        <div 
            class="context-menu-item"
            @click="$emit('selectMessages')"
            >
                <p class="text">Выбрать</p>
                <font-awesome-icon class="icon select" :icon="['fas', 'square-check']" />
            </div>
            <div 
            class="context-menu-item"
            @click="$emit('editMessage')"
            >
                <p class="text">Редактировать</p>
                <font-awesome-icon  class="icon edit" :icon="['fas', 'pen-to-square']" />
            </div>
            <div class="context-menu-item">
                <p class="text">Удалить</p>
                <font-awesome-icon class="icon delete" :icon="['fas', 'trash']" />
            </div>
            <div class="context-menu-item">
                <p class="text">Переслать</p>
                <font-awesome-icon  class="icon forward" :icon="['fas', 'share']" />
            </div>
            <div 
            class="context-menu-item"
            @click="$emit('showReplyedMessage')"
            >
                <p class="text">Ответить</p>
                <font-awesome-icon  class="icon reply" :icon="['fas', 'reply']" />
            </div>
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
    emits: ['close', 'showReplyedMessage', 'editMessage', 'selectMessages'],
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
    padding: 0.4rem;
    width: 200px;
    height: max-content;
    top: 0;
    left: 0;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
}
.context-menu-item {
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;
    cursor: pointer;
    transition: all .6s ease;
}
.text {
    width: 90%;
    font-family: var(--font);
    text-align: center;
}
.icon {
    width: 10%;
}
.icon.select {
    color: rgb(99, 99, 231);
}
.icon.edit {
    color: green;
}
.icon.delete {
    color: red;
}
.icon.forward {
    color: orange;
}
.icon.reply {
    color: var(--violet);
}
.context-menu-item:hover {
    transition: all .6s ease;
    background-color: rgba(128, 128, 128, 0.35);
}

</style>