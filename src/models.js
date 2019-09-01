import { isArraysEqual } from '@/utils';

export class Prompt {
  constructor(raw) {
    this.type = raw.type;
    switch (this.type) {
      case 'checkbox':
        this.checkboxes = [...raw.checkboxes];
        this.checkboxes.sort();
        this.default = [];
        break;
      case 'radio':
        this.radios = [...raw.radios];
        this.default = '';
        break;
      case 'text':
        this.placeholder = raw.placeholder;
        this.default = '';
        break;
      default:
        break;
    }
  }
}

export class Task {
  constructor(raw) {
    this.question = raw.question;
    this.answer = raw.answer;
    this.prompt = new Prompt(raw.prompt);
  }

  checkAnswer(userAnswer) {
    switch (this.prompt.type) {
      case 'checkbox': {
        const answer = [...userAnswer];
        answer.sort();
        return isArraysEqual(this.answer, answer);
      }
      default:
        return this.answer === userAnswer;
    }
  }

  getDisplayAnswer() {
    switch (this.prompt.type) {
      case 'checkbox': {
        return this.answer.join(', ');
      }
      default:
        return this.answer;
    }
  }
}

export class Test {
  constructor(raw) {
    this.topic = raw.topic;
    this.tasks = raw.tasks.map(rawTask => new Task(rawTask));
  }
}
