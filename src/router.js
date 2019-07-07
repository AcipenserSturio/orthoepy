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
      name: 'orthoepy-home',
      component: () => import(/* webpackChunkName: "orthoepy-home" */ './views/OrthoepyHome.vue'),
    },
    {
      path: '/orthoepy/article',
      name: 'orthoepy-article',
      component: () => import(/* webpackChunkName: "orthoepy-article" */ './views/OrthoepyArticle.vue'),
    },
    {
      path: '/nn',
      name: 'nn-home',
      component: () => import(/* webpackChunkName: "nn-home" */ './views/NNHome.vue'),
    },
    {
      path: '/not',
      name: 'not-home',
      component: () => import(/* webpackChunkName: "not-home" */ './views/NotHome.vue'),
    },
    {
      path: '/training',
      name: 'training',
      component: () => import(/* webpackChunkName: "training" */ './views/Training.vue'),
    },
    {
      path: '/:topic/training/questions',
      name: 'question-training',
      component: () => import(/* webpackChunkName: "question-training" */ './views/QuestionTraining.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ './views/NotFound.vue'),
    },
  ],
});
