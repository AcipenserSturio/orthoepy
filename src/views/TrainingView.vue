<template>
  <div>
    <v-navbar
      title="Тренажер"
      has-home-button
    />

    <section class="section" v-if="training" :key="'training'">
      <div class="columns">
        <div class="column is-half container">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">
                {{ training.title }}
              </div>
            </div>
            <div class="card-content">
              <div class="content">
                Dummy Content
              </div>
            </div>
            <div class="card-footer">
              <a class="card-footer-item">
                Dummy Footer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" v-else :key="'training-404'">
      <div class="columns">
        <div class="column is-half container">
          <h1 class="title">
            Увы,
          </h1>
          <h2 class="subtitle">
            но такой тренировки не существует
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VNavbar from '@/components/VNavbar.vue';
import getTraining from '@/trainer';

export default {
  name: 'TrainingView',
  components: {
    VNavbar,
  },
  beforeRouteEnter(to, from, next) {
    getTraining(to.params.topic).then((training) => {
      next(vm => training && vm.setTraining(training));
    });
  },
  data() {
    return {
      training: null,
    };
  },
  methods: {
    setTraining(training) {
      this.training = training;
    },
  },
};
</script>

<style scoped>
</style>
