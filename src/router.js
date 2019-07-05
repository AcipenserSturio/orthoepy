import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/orthoepy',
      name: 'orthoepy',
      component: () => import(/* webpackChunkName: "orthoepy" */ './views/Orthoepy.vue'),
    },
    {
      path: '/orthoepy/article',
      name: 'orthoepy-article',
      component: () => import(/* webpackChunkName: "orthoepy-article" */ './views/OrthoepyArticle.vue'),
    },
    {
      path: '/nn',
      name: 'single-or-double-n',
      component: () => import(/* webpackChunkName: "single-or-double-n" */ './views/SingleOrDoubleN.vue'),
    },
    {
      path: '/training',
      name: 'training',
      component: () => import(/* webpackChunkName: "training" */ './views/Training.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ './views/NotFound.vue'),
    },
  ],
});
