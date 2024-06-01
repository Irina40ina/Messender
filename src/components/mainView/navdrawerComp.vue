<template>
    <div class="navdrawer">
        <ul class="nav-list">
            <li class="nav-item">
                <div class="item__icon-block">
                </div>
                <div class="item__title-block">Profile</div>
            </li>
            <li class="nav-item">
                <div class="item__icon-block"></div>
                <div class="item__title-block">Messanger</div>
            </li>
            <li class="nav-item">
                <div class="item__icon-block"></div>
                <div class="item__title-block">Users</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navdrawer {
    grid-area: nav;
    border-right: var(--border); 
}
.nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: .5rem 1rem;
}
.nav-item {
    width: 100%;
    height: 50px;
    display: flex;
    background-color: var(--nav-item-color-bg);
}
.nav-item + .nav-item {
    margin-top: .2rem;
}
.item__icon-block {
    width: 20%;
    height: 100%;
    border-right: 1px solid black;
}
.item__title-block {
    width: 80%;
    height: 100%;
}
</style>    