import Task from '@/models/task';
import { TextExplanation } from '@/models/explanations';
import { TextPrompt } from '@/models/prompts';
import { shuffle } from '@/utils';
import Test from '@/models/test';

//
// Card Training Template: letter-insertion
//

async function makeTrainingLetterInsertion(title, assetFilename) {
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
// Default Export
//

export default {
  makeAsyncTrainingGettersForCard() {
    return {
      'ege-t11-suffices-ik-ek': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИК- и -ЕК-',
        'ege11__nouns_ik_ek',
      ),
      'ege-t11-suffices-ic-ec': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИЦ- и -ЕЦ-',
        'ege11__nouns_ic_ec',
      ),
      'ege-t11-suffices-ichk-echk': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИЧК- и -ЕЧК-',
        'ege11__nouns_ichk_echk',
      ),
      'ege-t11-suffices-ink-enk': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИНК- и -ЕНК-',
        'ege11__nouns_ink_enk',
      ),
      'ege-t11-nouns-mya': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные на -МЯ',
        'ege11__nouns_mya',
      ),
      'ege-t12-infinitives': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 12. Инфинитивы',
        'ege12__verbs_infinitives',
      ),
    };
  },
  makeAsyncTrainingGettersForTest() {
    return {};
  },
};