export default class Test {
  constructor(title, tasks, { hideProgress = false }) {
    this.title = title;
    this.tasks = tasks;
    this.options = { hideProgress };
  }
}
