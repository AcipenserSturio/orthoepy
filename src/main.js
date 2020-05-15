import Vue from 'vue';
import DOMPurify from 'dompurify';
import marked from 'marked';
import App from './App.vue';
import router from './router';
import store from './store';

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
