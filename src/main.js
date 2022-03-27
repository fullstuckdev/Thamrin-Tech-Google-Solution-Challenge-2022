import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue3 from "bootstrap-vue-3";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import "./assets/app.css";

import { projectAuth, projectFirestore } from "./config/firebase";
let app;

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        const app = createApp(App);
        app.use(VueGoogleMaps, {
            load: {
                key: "AIzaSyC0gXmzev0lfJwcyEGqWpnFEmu0i5ywf2c",
            },
        });
        app.use(BootstrapVue3);
        app.use(router).mount("#app");
    }
});

export { projectFirestore };