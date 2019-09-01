export class Prompt {
  constructor(raw) {
    this.type = raw.type;
    switch (this.type) {
      case 'checkbox':
        this.checkboxes = [...raw.checkboxes];
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
}

export class Test {
  constructor(raw) {
    this.topic = raw.topic;
    this.tasks = raw.tasks.map(rawTask => new Task(rawTask));
  }
}
