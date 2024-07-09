<template>
    <div class="main-view">
       
        <!-- TOP BAR -->
        <topbarComp></topbarComp>

        <!-- MAIN CONTENT -->
        <mainContentComp></mainContentComp>
        
        <!-- NAVIGATION DRAWER -->
        <navdrawerComp></navdrawerComp>

    </div>
</template>
<script>
import mainContentComp from "@/components/mainView/mainContentComp.vue"
import navdrawerComp from "@/components/mainView/navdrawerComp.vue"
import topbarComp from "@/components/mainView/topbarComp.vue"
import { getProfile } from "@/api/profileApi"
import { getUserById } from '@/api/usersApi';
export default {
    components: {
        mainContentComp,
        navdrawerComp,
        topbarComp,
    },
    // async mounted() {
    //     try {
    //         await getUserById(1);
    //     } catch {
    //         console.error(`views/MainView: mounted[getUserById] => ${err}`);
    //     }
    // },
}
</script>
<style scoped>
.main-view {
    width: 100%;
    height: 100vh;
    position: relative;
    display: grid;
    grid-template-columns: 4% 96%;
    grid-template-rows: 60px auto;
    grid-template-areas:
      "header header"
      "nav main";
}
</style>