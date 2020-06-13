export default class Training {
  constructor(
    title,
    tasks,
    {
      hideProgress = false,
      offerRepeat = false,
      showMistakesSummary = false,
      automaticallyOpenExplanation = false,
    },
  ) {
    this.title = title;
    this.tasks = tasks;

    this.config = {
      hideProgress,
      offerRepeat,
      showMistakesSummary,
      automaticallyOpenExplanation,
    };

    this.userAnswers = new Array(tasks.length).fill(null);
    this.userAnswersIsCorrect = new Array(tasks.length).fill(null);
    this.userAnswersTotalCount = 0;
    this.userAnswersCorrectCount = 0;
    this.userAnswersNullCount = 0;
  }

  onUserAnswer(taskIndex, userAnswer) {
    const task = this.tasks[taskIndex];

    let isCorrect = null;

    if (userAnswer !== null) {
      isCorrect = task.prompt.constructor.areValuesEqualByContent(
        userAnswer,
        task.correctAnswer,
      );
    } else {
      this.userAnswersNullCount += 1;
    }

    this.userAnswers[taskIndex] = userAnswer;
    this.userAnswersIsCorrect[taskIndex] = isCorrect;
    this.userAnswersTotalCount += 1;
    this.userAnswersCorrectCount += isCorrect ? 1 : 0;
  }

  static get STATE_ANSWERING() {
    return 'answering';
  }

  static get STATE_CHECKING() {
    return 'checking';
  }

  static get STATE_FINISHED() {
    return 'finished';
  }
}
