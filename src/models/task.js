export default class Task {
  constructor(question, answer, prompt) {
    this.question = question;
    this.answer = answer;
    this.prompt = prompt;
  }

  checkAnswer(userAnswer) {
    return this.prompt.isValuesEqual(
      this.prompt.normalizeValue(this.answer),
      this.prompt.normalizeValue(userAnswer),
    )
  }
}
