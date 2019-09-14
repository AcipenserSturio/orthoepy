export default class Task {
  constructor(question, answer, prompt, explanation) {
    this.question = question;
    this.answer = answer;
    this.prompt = prompt;
    this.explanation = explanation
  }

  checkAnswer(userAnswer) {
    return this.prompt.isValuesEqual(
      this.prompt.normalizeValue(this.answer),
      this.prompt.normalizeValue(userAnswer),
    )
  }
}
