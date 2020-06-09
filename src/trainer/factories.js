import Task from '@/models/task';
import { TextExplanation } from '@/models/explanations';
import { RadioButtonPrompt, TextPrompt } from '@/models/prompts_v2';
import { shuffle } from '@/utils';
import Training from '@/models/training';

//
// Training Factory: letter-insertion
//

export async function makeTrainingLetterInsertion(title, assetFilename) {
  const rawTasks = (await import(`@/assets/trainings/${assetFilename}`)).default;

  const statementPrefix = '*Вставьте пропущенную букву.*\n\n';
  const tasks = rawTasks.map(rawTask => new Task(
    statementPrefix + rawTask.word,
    rawTask.letter,
    new TextPrompt('Пропущенная буква'),
    !rawTask.explanation
      ? null
      : new TextExplanation(rawTask.explanation),
  ));
  shuffle(tasks);

  return new Training(title, tasks, { offerRepeat: true });
}

//
// Training Factory: stress-selecting
//

export async function makeTrainingStressSelecting(title, assetFilename) {
  const rawTasks = (await import(`@/assets/trainings/${assetFilename}`)).default;

  const tasks = rawTasks.map(rawTask => new Task(
    '*Выберите слово с правильным ударением.*',
    rawTask.correct,
    new RadioButtonPrompt(rawTask.options),
    null,
  ));
  shuffle(tasks);

  return new Training(title, tasks, {
    offerRepeat: true,
    showMistakesSummary: true,
  });
}
