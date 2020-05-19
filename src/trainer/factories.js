import Task from '@/models/task';
import { TextExplanation } from '@/models/explanations';
import { TextPrompt } from '@/models/prompts';
import { shuffle } from '@/utils';
import Test from '@/models/test';

//
// Card Training Factory: letter-insertion
//

/* eslint-disable-next-line import/prefer-default-export */
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
