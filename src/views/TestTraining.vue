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
          :text="task.text"
          :options="task.options"
          :answer="task.answer"
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
            <b-button class="is-primary" @click="onCheck">
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

function loadRawTasks(topic) {
  // FIXME: placeholder
  return {
    413: {
      text: '(Не)высокий, а низкий.',
      options: ['Слитно', 'Раздельно'],
      answer: 'Раздельно',
    },
    213: {
      text: '(Не)(с)кем пойти, был не в духе.',
      options: ['Слитно', 'Раздельно'],
      answer: 'Раздельно',
    },
    543: {
      text: '(Не)читая книг.',
      options: ['Слитно', 'Раздельно'],
      answer: 'Раздельно',
    },
    664: {
      text: '(Не)досчитал до десяти.',
      options: ['Слитно', 'Раздельно'],
      answer: 'Слитно',
    },
    778: {
      text: 'Их было (не)десять и даже (не)двадцать.',
      options: ['Слитно', 'Раздельно'],
      answer: 'Раздельно',
    },
  };
}
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

export default {
  name: 'TestTraining',
  components: { BButton, TestTrainingTask },
  data() {
    return {
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
          return 'Ходьба по ссылкам, а не по адресам сайта';
      }
    },
    correctCount() {
      let count = 0;
      this.tasks.forEach((task) => {
        if (this.answers[task.id] === task.answer) count += 1;
      });
      return count;
    },
    totalCount() {
      return this.tasks.length;
    },
  },
  methods: {
    setTasks() {
      const rawTasks = loadRawTasks(this.$route.params.topic);
      const tasksArray = convertObjectWithObjectsToArrayOfObjects(
        rawTasks,
        'id',
      );
      this.tasks = shuffledArray(tasksArray);
    },
    onCheck() {
      this.is_checking = true;
    },
    onAgain() {
      this.is_checking = false;
      this.answers = [];
    },
  },
  created() {
    this.setTasks();
  },
};
</script>

<style lang="scss" scoped>
.task {
  margin-top: 15px;
}
</style>
