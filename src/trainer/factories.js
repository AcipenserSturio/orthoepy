import Task from '@/models/task';
import { TextExplanation } from '@/models/explanations';
import { RadioPrompt, TextPrompt } from '@/models/prompts';
import { shuffle } from '@/utils';
import Test from '@/models/test';

//
// Card Training Factory: letter-insertion
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

  return new Test(title, tasks, { offerRepeat: true });
}

//
// Choose Training Factory: stress-choosing
//

export async function makeTrainingStressChoosing(title, assetFilename) {
  const rawTasks = (await import(`@/assets/trainings/${assetFilename}`)).default;

  const tasks = rawTasks.map(rawTask => new Task(
    '*Выберите слово с правильным ударением.*',
    rawTask.correct,
    new RadioPrompt(rawTask.options),
    null,
  ));
  shuffle(tasks);

  return new Test(title, tasks, { offerRepeat: true });
}
