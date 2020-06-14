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
              :training-state="trainingState"
              :active-task-index="activeTaskIndex"
              @finish="onFinish"
            />
            <TrainingCardContent
              :training="training"
              :training-state="trainingState"
              :active-task-index="activeTaskIndex"
              v-model="activeTaskUserAnswer"
            />
            <TrainingCardFooter
              :training="training"
              :training-state="trainingState"
              :active-task-index="activeTaskIndex"
              @answer="onAnswer"
              @continue="onContinue"
              @repeat="onRepeat"
              @close="onClose"
              v-model="activeTaskUserAnswer"
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
import TrainingCardHeader from '@/components/TrainingCardHeader.vue';
import TrainingCardContent from '@/components/TrainingCardContent.vue';
import TrainingCardFooter from '@/components/TrainingCardFooter.vue';
import VNavbar from '@/components/VNavbar.vue';
import getTraining from '@/trainer';
import Training from '@/models/training';

function trainingSessionId(trainingTopic) {
  return `training/${trainingTopic}`;
}

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
      training: undefined,
      trainingState: undefined,
      activeTaskIndex: undefined,
      activeTaskUserAnswer: undefined,
    };
  },
  computed: {
    isLastTask() {
      return this.training.tasks.length === this.activeTaskIndex + 1;
    },
  },
  beforeRouteEnter(to, from, next) {
    getTraining(to.params.topic).then((training) => {
      next((vm) => {
        const sessionId = trainingSessionId(to.params.topic);

        let savedSession = localStorage.getItem(sessionId) || '{}';
        savedSession = JSON.parse(savedSession);

        if (savedSession.savedTraining) {
          savedSession.savedTraining = Training.fromJSON(savedSession.savedTraining);
        }

        vm.startTrainingSession(training, savedSession);
      });
    });
  },
  created() {
    window.addEventListener('beforeunload', this.onUnload);
  },
  beforeDestroy() {
    window.addEventListener('beforeunload', this.onUnload);
  },
  methods: {
    initTraining(
      training,
      trainingState = Training.STATE_ANSWERING,
      activeTaskIndex = 0,
    ) {
      if (training === null) {
        this.training = null;
        this.trainingState = null;
        this.setActiveTaskIndex(null);
        return;
      }

      this.training = training;
      this.trainingState = trainingState;
      this.setActiveTaskIndex(activeTaskIndex);
    },
    setActiveTaskIndex(activeTaskIndex) {
      if (activeTaskIndex === null) {
        this.activeTaskIndex = null;
        this.activeTaskUserAnswer = null;
        return;
      }

      this.activeTaskIndex = activeTaskIndex;
      this.activeTaskUserAnswer = this.training.tasks[activeTaskIndex].prompt.defaultValue;
    },
    onAnswer() {
      this.training.onUserAnswer(this.activeTaskIndex, this.activeTaskUserAnswer);
      this.trainingState = Training.STATE_CHECKING;
    },
    onContinue() {
      if (this.isLastTask) {
        this.setActiveTaskIndex(null);
        this.onFinish();
        return;
      }

      this.setActiveTaskIndex(this.activeTaskIndex + 1);
      this.trainingState = Training.STATE_ANSWERING;
    },
    onFinish() {
      const shouldExitWithoutWarning = (
        this.activeTaskIndex === null
        || (this.activeTaskIndex === 0 && this.trainingState === Training.STATE_ANSWERING)
      );

      if (!shouldExitWithoutWarning) {
        this.$buefy.dialog.confirm({
          message: 'Вы уверены, что хотите <strong>преждевременно</strong> закончить тренировку?',
          confirmText: 'Закончить',
          cancelText: 'Отмена',
          onConfirm: () => {
            this.endTrainingSession();
            this.trainingState = Training.STATE_FINISHED;
          },
        });
        return;
      }

      this.endTrainingSession();
      this.trainingState = Training.STATE_FINISHED;
    },
    onRepeat() {
      const loadingComponent = this.$buefy.loading.open({ container: null });

      getTraining(this.$route.params.topic).then((training) => {
        this.endTrainingSession();
        this.startTrainingSession(training || null);
        loadingComponent.close();
      });
    },
    onClose() {
      this.$router.back();
    },
    onUnload() {
      this.endTrainingSession();
    },
    startTrainingSession(newTraining, {
      savedTraining = null,
      savedTrainingState = null,
      savedActiveTaskIndex = null,
    } = {}) {
      if (savedTraining) {
        this.initTraining(savedTraining, savedTrainingState, savedActiveTaskIndex);

        this.$buefy.dialog.confirm({
          message: 'Хотите продолжить свою последнюю тренировку?',
          confirmText: 'Да',
          cancelText: 'Нет',
          onCancel: () => {
            this.clearSessionLocalStorage();
            this.initTraining(newTraining || null);
          },
        });
        return;
      }

      this.initTraining(newTraining || null);
    },
    endTrainingSession() {
      const sessionId = trainingSessionId(this.$route.params.topic);

      if (this.activeTaskIndex === null) {
        this.clearSessionLocalStorage();
        return;
      }

      if (this.activeTaskIndex === 0 && this.trainingState === Training.STATE_ANSWERING) {
        this.clearSessionLocalStorage();
        return;
      }

      const trainingSession = {
        savedTraining: this.training,
        savedTrainingState: this.trainingState,
        savedActiveTaskIndex: this.activeTaskIndex,
      };

      localStorage.setItem(sessionId, JSON.stringify(trainingSession));
    },
    clearSessionLocalStorage() {
      const sessionId = trainingSessionId(this.$route.params.topic);
      localStorage.setItem(sessionId, '{}');
    },
  },
};
</script>

<style scoped>
.column-training {
  max-width: 30rem;
}
</style>
