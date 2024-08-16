import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import components from '@/components';
import { vuetify } from "./plugins/vuetify";
import { vMaska } from "maska";


// ICON AWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faUserGroup, faEnvelope, faPenToSquare, faArrowRightFromBracket, faXmark, faRotateLeft, faCheck, faFloppyDisk, faTrash, faMagnifyingGlass, faSpinner, faPaperPlane, faComment, faShare, faReply, faSquareCheck, faEye, faEyeSlash, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faUserGroup, faEnvelope, faPenToSquare, faArrowRightFromBracket, faXmark, faRotateLeft, faCheck, faFloppyDisk, faTrash, faMagnifyingGlass, faSpinner, faPaperPlane, faComment, faShare, faReply, faSquareCheck, faEye, faEyeSlash, );

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);
components.forEach((component) => {
    app.component(component.name, component);
});

app.directive('maska', vMaska);

app
    .use(pinia)
    .use(router)
    .use(vuetify)
    .mount("#app")
