export default class Task {
  constructor(question, correctAnswer, prompt, explanation) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.prompt = prompt;
    this.explanation = explanation;
  }
}
