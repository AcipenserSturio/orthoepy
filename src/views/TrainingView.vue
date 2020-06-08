<template>
  <div>
    <v-navbar
      title="Тренажер"
      has-home-button
    />
    <section class="section">
      <div class="columns">
        <div class="column column-training is-full container">

          <div class="card" v-if="training" :key="'training'">
            <div class="card-header">
              <div class="card-header-title">
                {{ training.title }}
              </div>
            </div>
            <div class="card-content">
              <div class="content" v-html="marked(activeTask.question)"></div>
            </div>
            <div class="card-footer">
              <a class="card-footer-item">
                Dummy Footer
              </a>
            </div>
          </div>

          <div v-else :key="'training-404'">
            <h1 class="title">
              Увы,
            </h1>
            <h2 class="subtitle">
              но такой тренировки не существует
            </h2>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VNavbar from '@/components/VNavbar.vue';
import getTraining from '@/trainer';
import marked from 'marked';

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
      activeTaskIndex: 0,
    };
  },
  computed: {
    activeTask() {
      return this.training.tasks[this.activeTaskIndex];
    },
  },
  methods: {
    setTraining(training) {
      this.training = training;
    },
    marked(text) {
      return marked(text);
    },
  },
};
</script>

<style scoped>
.column-training {
  max-width: 30rem;
}
</style>
