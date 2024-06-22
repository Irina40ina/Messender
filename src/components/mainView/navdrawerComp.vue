<template>
    <div 
    class="navdrawer"
    @mouseenter="expandNavdrawer"
    @mouseleave="collapseNavdrawer"
    >
        <ul class="nav-list">
            <li 
            class="nav-item"
            @click="$router.push({ name: 'profile' })"
            >
                <div class="item__icon-block">
                    <font-awesome-icon icon="fa-user" class="icon"></font-awesome-icon>
                </div>
                <div class="item__title-block">
                    <p>Profile</p>
                </div>
            </li>
            <li 
            class="nav-item"
            @click="$router.push({ name: 'messanger' })"
            >
                <div class="item__icon-block">
                    <font-awesome-icon icon="fa-envelope" class="icon"></font-awesome-icon>
                </div>
                <div class="item__title-block">
                    <p>Messanger</p>
                </div>
            </li>
            <li 
            class="nav-item"
            @click="$router.push({ name: 'users' })"
            >
                <div class="item__icon-block">
                    <font-awesome-icon icon="fa-user-group" class="icon"></font-awesome-icon>
                </div>
                <div class="item__title-block">
                    <p>Users</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import gsap from 'gsap';
export default {
    methods: {
        expandNavdrawer(e) {
            const navDrawer = e.target;
            gsap.to(navDrawer, { duration: 0.2, width: '350px' })
                .then(() => {
                    gsap.to('.item__icon-block', { duration: 0.3, width: '20%' })
                    gsap.to('.item__title-block', { duration: 0.3, width: '80%' })
                })
                .then(() => {
                    gsap.to('.item__icon-block', { duration: 1.2, borderRight: '2px solid rgba(80, 80, 80, .5)'})
                })
        },
        collapseNavdrawer(e) {
            const navDrawer = e.target;
            gsap.to('.item__icon-block', { duration: 0.3, width: '100%' })
            gsap.to('.item__title-block', { duration: 0.3, width: '0%', })
            gsap.to(navDrawer, { duration: 0.2, width: '80px' })
            .then(() => {
                gsap.to('.item__icon-block', { duration: 1.2, borderRight: '2px solid rgba(80, 80, 80, 0)'})
            })
        }
    },

}
</script>

<style scoped>
.navdrawer {
    width: 80px;
    position: relative;
    grid-area: nav;
    border-right: var(--border); 
    background-color: var(--color-bg-main);
    z-index: 1;
}
.nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: .5rem 0.8rem;
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 2px solid rgba(80, 80, 80, 0);
}
.icon {
    font-size: 25px;
    color: gray;
}
.item__title-block {
    width: 0%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: var(--font);
    color: rgba(80, 80, 80, 0.9);
}
.item__title-block p {
    margin: 0 1rem;
}
</style>    