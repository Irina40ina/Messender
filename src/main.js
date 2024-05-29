import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import components from '@/components';

const app = createApp(App);
const pinia = createPinia();

components.forEach((component) => {
    app.component(component.name, component);
});

app;
app
    .use(pinia)
    .use(router)
    .mount("#app")
