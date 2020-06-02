import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
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
    path: '/ege04',
    name: 'ege04-home',
    component: () => import(/* webpackChunkName: "ege04-home" */ './views/Ege04HomeView.vue'),
  },
  {
    path: '/ege11',
    name: 'ege11-home',
    component: () => import(/* webpackChunkName: "ege11-home" */ './views/Ege11HomeView.vue'),
  },
  {
    path: '/ege12',
    name: 'ege12-home',
    component: () => import(/* webpackChunkName: "ege12-home" */ './views/Ege12HomeView.vue'),
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
    meta: {
      shouldShowLoading: true,
    },
  },
  {
    path: '/training/choose/:topic',
    name: 'training-choose',
    component: () => import(/* webpackChunkName: "training-choose" */ './views/TrainingChooseView.vue'),
    meta: {
      shouldShowLoading: true,
    },
  },
  {
    path: '/training/test/:topic',
    name: 'training-test',
    component: () => import(/* webpackChunkName: "training-test" */ './views/TrainingTestView.vue'),
    meta: {
      shouldShowLoading: true,
    },
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ './views/NotFoundView.vue'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

let loadingComponent;

router.beforeEach((to, from, next) => {
  if (to.meta.shouldShowLoading) {
    loadingComponent = router.app.$buefy.loading.open(
      { container: null },
    );
  }
  next();
});
router.afterEach((to) => {
  if (to.meta.shouldShowLoading) {
    loadingComponent.close();
    loadingComponent = null;
  }
});

export default router;
