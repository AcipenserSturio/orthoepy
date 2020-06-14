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

    let prompt = null;
    let explanation = null;

    if (jsonPrompt) {
      const { className: promptClassName } = jsonPrompt;
      prompt = promptClass(promptClassName).fromJSON(jsonPrompt);
    }

    if (jsonExplanation) {
      const { className: explanationClassName } = jsonExplanation;
      explanation = explanationClass(explanationClassName).fromJSON(jsonExplanation);
    }

    return new this(question, correctAnswer, prompt, explanation);
  }
}
