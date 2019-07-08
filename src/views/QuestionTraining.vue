<template>
  <div class="has-items-centered has-background-info">
    <div class="card question-card"
         :class="{
           'last-wrong-card': isLastWrong,
           'last-correct-card': isLastCorrect,
         }">
      <header class="card-header">
        <p class="card-header-title">
          Вопрос {{ questionNumber }}/{{ questionsCount }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-justified">
          <p>{{ questionText }}</p>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item"
           v-for="option in questionOptions"
           :key="option"
           @click="submitAnswer(option)">
          {{ option }}
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
function loadRawQuestions(topic) {
  // FIXME: placeholder
  return {
    1: {
      text: 'Не употребляется без НЕ',
      options: ['Слитно', 'Раздельно', 'Не знаю'],
      answer: 'Слитно',
    },
    2: {
      text: 'Противопоставление с "а"',
      options: ['Слитно', 'Раздельно', 'Не знаю'],
      answer: 'Раздельно',
    },
    3: {
      text: 'Есть предлог',
      options: ['Слитно', 'Раздельно', 'Не знаю'],
      answer: 'Раздельно',
    },
    4: {
      text: 'Глагол, деепричастие, краткое причастие',
      options: ['Слитно', 'Раздельно', 'Не знаю'],
      answer: 'Раздельно',
    },
    5: {
      text: 'Глагол, деепричастие, краткое причастие с приставкой "Недо" противоположной по значению приставке "Пере"',
      options: ['Слитно', 'Раздельно', 'Не знаю'],
      answer: 'Слитно',
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
  name: 'QuestionTraining',
  data() {
    return {
      questions: [],
      answers: {},
      question_i: 0,
      is_last_answer_correct: null,
    };
  },
  computed: {
    questionsCount() {
      return this.questions.length;
    },
    questionNumber() {
      return this.question_i + 1;
    },
    questionText() {
      return this.questions[this.question_i].text;
    },
    questionOptions() {
      return this.questions[this.question_i].options;
    },
    questionAnswer() {
      return this.questions[this.question_i].answer;
    },
    isLastWrong() {
      return this.is_last_answer_correct === false;
    },
    isLastCorrect() {
      return this.is_last_answer_correct === true;
    },
    isLastQuestion() {
      return this.questionNumber === this.questionsCount;
    },
  },
  methods: {
    setQuestions() {
      const rawQuestions = loadRawQuestions(this.$route.params.topic);
      const questionsArray = convertObjectWithObjectsToArrayOfObjects(
        rawQuestions,
        'id',
      );
      this.questions = shuffledArray(questionsArray);
    },
    submitAnswer(answer) {
      const questionID = this.questions[this.question_i].id;
      this.answers[questionID] = answer;
      this.is_last_answer_correct = answer === this.questionAnswer;
      if (this.isLastQuestion) {
        this.completeTraining();
      } else {
        this.question_i += 1;
      }
    },
    completeTraining() {
      // FIXME: generate test
      // FIXME: show model with results before pushing a new route
      if (this.$route.params.topic === 'not') {
        this.$router.push({ name: 'test-training', params: { topic: 'not' } });
      }
    },
  },
  created() {
    this.setQuestions();
  },
};
</script>

<style lang="scss" scoped>
.has-items-centered {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.question-card {
  width: 24rem;
  border-radius: 6px;
}

.last-wrong-card {
  box-shadow: 0 0 15px 1px rgba(hsl(348, 100%, 61%), 1);
}

.last-correct-card {
  box-shadow: 0 0 15px 1px rgba(hsl(141, 71%, 48%), 1);
}
</style>
