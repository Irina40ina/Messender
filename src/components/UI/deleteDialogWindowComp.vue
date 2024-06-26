<template>
    <div class="delete-dialog-window">
        <div class="delete-dialog-window__text">
            <p>Вы уверены, что хотите удалить аккаунт?</p>
        </div>
        <div class="delete-dialog-window__actions">
            <button class="action-btn delete">Да</button>
            <button
            class="action-btn cancel"
            @click="$emit('close')"
            >
            Нет
            </button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['close'],
}
</script>

<style scoped>
    .delete-dialog-window {
        width: 400px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .delete-dialog-window__text {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .delete-dialog-window__actions {
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .action-btn {
        height: 30px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: rgba(0,0,0,0);
        border-radius: 3px;
        cursor: pointer;
        transition: all .3s ease;
    }

    
    .action-btn.cancel {
        border: 1px solid rgb(109, 172, 84);
        color: rgb(119, 172, 84);
        margin-left: 1rem;
    }
    .action-btn.delete {
        border: 1px solid rgb(172, 84, 84);
        color: rgb(172, 84, 84);
    }
    .action-btn.cancel:hover {
        color: rgb(92, 209, 46);
        border-color: rgb(92, 209, 46);
        transition: all .3 ease;
    }
    .action-btn.delete:hover {
        border: 1px solid red;
        color: red;
        transition: all .3s ease;
    }
</style>