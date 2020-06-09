export default class Training {
  constructor(
    title,
    tasks,
    {
      hideProgress = false,
      offerRepeat = false,
      showMistakesSummary = false,
    },
  ) {
    this.title = title;
    this.tasks = tasks;

    this.config = {
      hideProgress,
      offerRepeat,
      showMistakesSummary,
    };

    this.userAnswers = new Array(tasks.length).fill(null);
    this.userAnswersIsCorrect = new Array(tasks.length).fill(null);
    this.userAnswersTotalCount = 0;
    this.userAnswersCorrectCount = 0;
  }

  onUserAnswer(taskIndex, userAnswer) {
    const task = this.tasks[taskIndex];

    const isCorrect = task.prompt.constructor.areEqualByContent(
      userAnswer,
      task.correctAnswer,
    );

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
