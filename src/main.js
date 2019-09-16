import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import DOMPurify from 'dompurify';
import marked from 'marked';


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
