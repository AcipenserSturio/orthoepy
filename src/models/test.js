export default class Test {
  constructor(
    title,
    tasks,
    {
      hideProgress = false,
      offerRepeat = false,
      showMistakesSummary = false,
    },
  ) {
    this.title = title;
    this.tasks = tasks;
    this.options = { hideProgress, offerRepeat, showMistakesSummary };
  }
}
