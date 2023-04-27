import "bootstrap/dist/css/bootstrap.css";

import {createApp} from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Toaster from "@meforma/vue-toaster";
// import the package
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

library.add(fas);

const app = createApp({
    extends: App,
    beforeCreate() { store.commit("initializeStore"); },
});

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $toast: Toaster;
        $store: typeof store;
    }
}
app.config.globalProperties.MDBT_API_KEY = "b8b3e66e9192eeaa12e7e90dd87d7dd2";
app
    .component("font-icon", FontAwesomeIcon)
    .use(store)
    .use(router)
    .use(Toaster, { position: "top" })
    .use(VueAwesomePaginate)
    .mount("#app");
import "bootstrap/dist/js/bootstrap.js";
