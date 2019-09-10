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

export class Explanation {
  constructor(raw) {
    this.type = raw.type;
    switch (this.type) {
      case 'text':
        this.text = raw.text;
        break;
      case 'rule-chain':
        this.ruleChain = [...raw.rule_chain];
        this.chainTail = raw.chain_tail;
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
    this.explanation = raw.explanation
      ? new Explanation(raw.explanation)
      : null;
    this.prompt = new Prompt(raw.prompt);
  }

  checkAnswer(userAnswer) {
    switch (this.prompt.type) {
      case 'checkbox': {
        if (!userAnswer) {
          return false
        }
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
