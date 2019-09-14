export default class Task {
  constructor(question, answer, prompt, explanation) {
    this.question = question;
    this.answer = answer;
    this.prompt = prompt;
    this.explanation = explanation
  }

  checkAnswer(userAnswer) {
    return this.prompt.constructor.isValuesEqual(
      this.prompt.constructor.normalizeValue(this.answer),
      this.prompt.constructor.normalizeValue(userAnswer),
    )
  }
}
