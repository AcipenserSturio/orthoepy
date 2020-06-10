<template>
  <div>
    <VNavbar
      title="Тренажер"
      has-home-button
    />
    <section class="section">
      <div class="columns">
        <div class="column column-training is-full container">
          <div class="card" v-if="training">
            <TrainingCardHeader
              :training="training"
              :active-task-index="activeTaskIndex"
              :active-state="activeState"
              @finish="onFinish"
            />
            <TrainingCardContent
              :training="training"
              :active-task-index="activeTaskIndex"
              :active-state="activeState"
              v-model="userAnswer"
            />
            <TrainingCardFooter
              :training="training"
              :active-task-index="activeTaskIndex"
              :active-state="activeState"
              @answer="onAnswer"
              @continue="onContinue"
              @repeat="onRepeat"
              @home="onHome"
              v-model="userAnswer"
            />
          </div>

          <div v-else>
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
import TrainingCardHeader from '@/components/TrainingCardHeader.vue';
import TrainingCardContent from '@/components/TrainingCardContent.vue';
import TrainingCardFooter from '@/components/TrainingCardFooter.vue';
import getTraining from '@/trainer';
import Training from '@/models/training';

export default {
  name: 'TrainingView',
  components: {
    TrainingCardContent,
    TrainingCardFooter,
    TrainingCardHeader,
    VNavbar,
  },
  data() {
    return {
      training: null,
      activeTaskIndex: null,
      activeState: null,
      userAnswer: null,
    };
  },
  computed: {
    isLastTask() {
      return this.training.tasks.length === this.activeTaskIndex + 1;
    },
  },
  watch: {
    training() {
      this.activeTaskIndex = 0;
      this.activeState = Training.STATE_ANSWERING;
    },
    activeTaskIndex(oldTaskIndex, newTaskIndex) {
      const newTask = this.training.tasks[newTaskIndex];
      this.userAnswer = newTask.prompt.constructor.defaultValue;
    },
  },
  beforeRouteEnter(to, from, next) {
    getTraining(to.params.topic).then((training) => {
      next(vm => training && vm.setTraining(training));
    });
  },
  methods: {
    setTraining(training) {
      this.training = training;
    },
    onAnswer() {
      this.training.onUserAnswer(this.activeTaskIndex, this.userAnswer);
      this.activeState = Training.STATE_CHECKING;
    },
    onContinue() {
      if (this.isLastTask) {
        this.onFinish();
        return;
      }

      this.activeTaskIndex += 1;
      this.activeState = Training.STATE_ANSWERING;
    },
    onFinish() {
      this.activeState = Training.STATE_FINISHED;
    },
    onRepeat() {
      const loadingComponent = this.$buefy.loading.open({ container: null });

      getTraining(this.$route.params.topic).then((training) => {
        this.setTraining(training || null);
        loadingComponent.close();
      });
    },
    onHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>
.column-training {
  max-width: 30rem;
}
</style>
