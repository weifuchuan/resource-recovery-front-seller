import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'src/weui.min.css'

import Vuebar from 'vuebar';
Vue.use(Vuebar);

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI);

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
// Init plugin
Vue.use(Loading);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
