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
      component: () => import(/* webpackChunkName: "home" */ './views/HomeView.vue'),
    },
    {
      path: '/orthoepy',
      name: 'orthoepy-home',
      component: () => import(/* webpackChunkName: "orthoepy-home" */ './views/OrthoepyHomeView.vue'),
    },
    {
      path: '/orthoepy/article',
      name: 'orthoepy-article',
      component: () => import(/* webpackChunkName: "orthoepy-article" */ './views/OrthoepyArticleView.vue'),
    },
    {
      path: '/nn',
      name: 'nn-home',
      component: () => import(/* webpackChunkName: "nn-home" */ './views/NNHomeView.vue'),
    },
    {
      path: '/not',
      name: 'not-home',
      component: () => import(/* webpackChunkName: "not-home" */ './views/NotHomeView.vue'),
    },
    {
      path: '/training',
      name: 'training',
      component: () => import(/* webpackChunkName: "training" */ './views/TrainingView.vue'),
    },
    {
      path: '/training/card/:topic',
      name: 'training-card',
      component: () => import(/* webpackChunkName: "training-card" */ './views/TrainingCardView.vue'),
    },
    {
      path: '/training/test/:topic',
      name: 'training-test',
      component: () => import(/* webpackChunkName: "training-test" */ './views/TrainingTestView.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ './views/NotFoundView.vue'),
    },
  ],
});
