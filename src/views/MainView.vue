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
import { getUserDataMe } from '@/api/usersApi';
import { useMainStore } from "@/store/mainStore";
import { entrySocketStarted } from "@/api/socket/inputApi";
export default {
    components: {
        mainContentComp,
        navdrawerComp,
        topbarComp,
    },
    created: async () => {
     try {
       const userDataStorage = localStorage.getItem('user');
       const tokenStorage = localStorage.getItem('token');
       if(userDataStorage) {
         useMainStore().user = JSON.parse(userDataStorage);
        } else {
          if(!tokenStorage) return console.log('Токена доступа нет'); 
          const data = await getUserDataMe();
          localStorage.setItem('user', JSON.stringify(data));
          useMainStore().user = data;
        }
      } catch (err) {
        console.error(`/views/MainView.vue: created => ${err}`);
      }
    // Инициализация сокет-подключения
    entrySocketStarted();
  }
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