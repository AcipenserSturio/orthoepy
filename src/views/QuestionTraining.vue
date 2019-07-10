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
import notRulesAsTasks from '@/assets/not_rules_as_tasks.json';

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
      rulesAsTasks: notRulesAsTasks,
      questions: [],
      answers: {},
      question_i: 0,
      is_last_answer_correct: null,
      answersCorrectness: {},
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
      return this.questions[this.question_i].wording;
    },
    questionOptions() {
      return this.questions[this.question_i].input.elements;
    },
    questionAnswer() {
      return this.questions[this.question_i].correct;
    },
    questionID() {
      return this.questions[this.question_i].id;
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
    makeQuestions() {
      const questionsArray = convertObjectWithObjectsToArrayOfObjects(
        this.rulesAsTasks,
        'id',
      );
      return shuffledArray(questionsArray);
    },
    submitAnswer(answer) {
      this.answers[this.questionID] = answer;
      this.is_last_answer_correct = answer === this.questionAnswer;
      this.answersCorrectness[this.questionID] = this.is_last_answer_correct;
      if (this.isLastQuestion) {
        this.completeTraining();
      } else {
        this.question_i += 1;
      }
    },
    completeTraining() {
      // FIXME: show model with results before pushing a new route
      const correctRuleAsTaskIDs = [];
      const wrongRuleAsTaskIDs = [];
      Object.keys(this.answersCorrectness).forEach((id) => {
        if (this.answersCorrectness[id] === true) {
          correctRuleAsTaskIDs.push(id);
        } else {
          wrongRuleAsTaskIDs.push(id);
        }
      });
      if (this.$route.params.topic === 'not') {
        this.$router.push({
          name: 'test-training',
          params: {
            topic: 'not',
          },
          query: {
            correct: JSON.stringify(correctRuleAsTaskIDs),
            wrong: JSON.stringify(wrongRuleAsTaskIDs),
          },
        });
      }
    },
  },
  created() {
    this.questions = this.makeQuestions();
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
