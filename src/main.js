import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

// imports
import axios from 'axios'
import moment from 'moment'
import accessDataMixin from '@/mixins/accessData.js';

Vue.prototype.$http = axios
Vue.prototype.momentjs = moment

Vue.config.productionTip = false

Vue.mixin(accessDataMixin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
