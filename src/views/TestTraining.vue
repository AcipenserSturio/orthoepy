<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Тест
          </h1>
          <h2 class="subtitle">
            {{ topicText }}
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <test-training-task
          class="task"
          v-for="(task, index) in tasks"
          :key="index"
          :number="index + 1"
          :text="task.wording"
          :input="task.input"
          :answer="task.correct"
          :selected.sync="answers[task.id]"
          :checking="is_checking"
        />
        <br>
        <div>
          <div v-if="is_checking">
            <div class="has-text-centered">
              <i>Результат: {{ correctCount }}/{{ totalCount }}</i>
            </div>
            <br>
          </div>
          <div class="buttons is-centered">
            <b-button
              class="is-primary"
              @click="onCheck"
              :disabled="is_checking">
              Проверить
            </b-button>
            <b-button @click="onAgain">
              Заново
            </b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BButton from 'buefy/src/components/button/Button.vue';
import TestTrainingTask from '../components/TestTrainingTask.vue';
import notRules from '@/assets/not_rules.json';
import notTasks from '@/assets/not_tasks.json';

function convertObjectWithObjectsToArrayOfObjects(objects, keyName) {
  const array = [];
  Object.keys(objects).forEach((key) => {
    const object = Object.assign({}, objects[key]);
    object[keyName] = key;
    array.push(object);
  });
  return array;
}
function shuffledArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function popRandomFromArray(array) {
  const indexToPop = Math.floor(Math.random() * array.length);
  const lastIndex = array.length - 1;
  // eslint-disable-next-line no-param-reassign
  [array[lastIndex], array[indexToPop]] = [array[indexToPop], array[lastIndex]];
  return array.pop();
}

export default {
  name: 'TestTraining',
  components: { BButton, TestTrainingTask },
  props: {
    correctRuleAsTaskIDs: Set,
    wrongRuleAsTaskIDs: Set,
  },
  data() {
    return {
      taskObjects: notTasks,
      rules: notRules,
      tasks: [],
      answers: {},
      is_checking: false,
    };
  },
  computed: {
    topicText() {
      switch (this.$route.params.topic) {
        case 'nn':
          return 'Н/НН';
        case 'not':
          return 'Слитное и раздельное правописание НЕ';
        case 'orthoepy':
          return 'Орфоэпия';
        default:
          return 'Учимся ходить по ссылкам на сайте, а не по URL';
      }
    },
    correctCount() {
      let count = 0;
      this.tasks.forEach((task) => {
        if (this.answers[task.id] === task.correct) count += 1;
      });
      return count;
    },
    totalCount() {
      return this.tasks.length;
    },
  },
  methods: {
    makeTasks() {
      const selectedTaskIDs = [];
      Object.keys(this.rules).forEach((ruleID) => {
        const ruleAsTaskID = this.rules[ruleID].rule_as_task_id;
        const taskIDsToSelect = this.rules[ruleID].task_ids.concat(
          this.rules[ruleID].exception_task_ids,
        );

        let tasksToSelectCount;
        if (this.correctRuleAsTaskIDs.has(ruleAsTaskID)) {
          tasksToSelectCount = 1;
        } else if (this.wrongRuleAsTaskIDs.has(ruleAsTaskID)) {
          tasksToSelectCount = 2;
        } else {
          return;
        }

        for (let i = 0; i < tasksToSelectCount; i += 1) {
          if (taskIDsToSelect.length === 0) break;
          const taskID = popRandomFromArray(taskIDsToSelect);
          selectedTaskIDs.push(taskID);
        }
      });
      const selectedTaskObjects = {};
      selectedTaskIDs.forEach((id) => {
        selectedTaskObjects[id] = this.taskObjects[id];
      });
      const tasksArray = convertObjectWithObjectsToArrayOfObjects(
        selectedTaskObjects,
        'id',
      );
      return shuffledArray(tasksArray);
    },
    makeAnswers() {
      const answers = {};
      this.tasks.forEach((task) => {
        answers[task.id] = null;
      });
      return answers;
    },
    onCheck() {
      this.is_checking = true;
    },
    onAgain() {
      this.is_checking = false;
      this.answers = this.makeAnswers();
    },
  },
  created() {
    this.tasks = this.makeTasks();
    this.answers = this.makeAnswers();
  },
};
</script>

<style lang="scss" scoped>
.task {
  margin-top: 15px;
}
</style>
