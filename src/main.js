import Buefy from 'buefy';
import Vue from 'vue';
import DOMPurify from 'dompurify';
import marked from 'marked';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.use(Buefy, { defaultIconPack: 'fas' });

marked.setOptions({
  sanitizer: DOMPurify.sanitize,
  smartLists: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
