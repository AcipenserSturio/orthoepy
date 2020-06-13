import { promptClass } from '@/models/prompts';
import { explanationClass } from '@/models/explanations';

export default class Task {
  constructor(question, correctAnswer, prompt, explanation) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.prompt = prompt;
    this.explanation = explanation;
  }

  toJSON() {
    const className = this.constructor.name;
    const {
      question,
      correctAnswer,
      prompt,
      explanation,
    } = this;

    return {
      className,
      question,
      correctAnswer,
      prompt,
      explanation,
    };
  }

  static fromJSON(obj) {
    const {
      question,
      correctAnswer,
      prompt: jsonPrompt,
      explanation: jsonExplanation,
    } = obj;

    const { className: promptClassName } = jsonPrompt;
    const { className: explanationClassName } = jsonExplanation;

    const prompt = promptClass(promptClassName).fromJSON(jsonPrompt);
    const explanation = explanationClass(explanationClassName).fromJSON(jsonExplanation);

    return new this(question, correctAnswer, prompt, explanation);
  }
}
