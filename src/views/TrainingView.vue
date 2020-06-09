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
import marked from 'marked';
import Training from '@/models/training';

export default {
  name: 'TrainingView',
  components: {
    TrainingCardContent,
    TrainingCardFooter,
    TrainingCardHeader,
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
      activeState: Training.STATE_ANSWERING,
      userAnswer: null,
    };
  },
  computed: {
    activeTask() {
      return this.training.tasks[this.activeTaskIndex];
    },
    isLastTask() {
      return this.training.tasks.length === this.activeTaskIndex + 1;
    },
    isButtonPrompt() {
      return this.activeTask.prompt.constructor.type === 'button';
    },
  },
  methods: {
    setTraining(training) {
      this.training = training;
      this.activeTaskIndex = 0;
      this.activeState = Training.STATE_ANSWERING;
      this.userAnswer = null;
    },
    marked(text) {
      return marked(text);
    },
    onAnswer(userAnswer) {
      if (this.isButtonPrompt) {
        this.userAnswer = userAnswer;
      }

      this.training.onUserAnswer(this.activeTaskIndex, this.userAnswer);
      this.activeState = Training.STATE_CHECKING;
    },
    onContinue() {
      if (this.isLastTask) {
        this.onFinish();
        return;
      }

      this.userAnswer = null;
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
