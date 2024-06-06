import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import components from '@/components';

// ICON AWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faUserGroup, faEnvelope, faPenToSquare, faArrowRightFromBracket, faXmark, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faUserGroup, faEnvelope, faPenToSquare, faArrowRightFromBracket, faXmark, faArrowRotateRight);

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);
components.forEach((component) => {
    app.component(component.name, component);
});

app;
app
    .use(pinia)
    .use(router)
    .mount("#app")
