export class Prompt {
  constructor(raw) {
    this.type = raw.type;
    this.radios = (raw.radios) ? [...raw.radios] : undefined;
    this.placeholder = raw.placeholder;
    this.checkboxes = (raw.checkboxes) ? [...raw.checkboxes] : undefined;
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
    this.tasks = [...raw.tasks].map(rawTask => new Task(rawTask));
  }
}
