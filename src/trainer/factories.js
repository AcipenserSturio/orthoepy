import Task from '@/models/task';
import { TextExplanation } from '@/models/explanations';
import { RadioButtonPrompt, TextPrompt, SelfCheckPrompt } from '@/models/prompts';
import { capitalize, shuffle } from '@/utils';
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

  return new Training(title, tasks, {
    offerRepeat: true,
    showMistakesSummary: true,
  });
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

//
// Training Factory: paronym-explaining
//

export async function makeTrainingParonymExplaining(title, assetFilename) {
  const paronyms = (await import(`@/assets/trainings/${assetFilename}`)).default;

  const questionPrefix = '*Объясните каждое слово:*\n\n';

  const tasks = paronyms.map((paronymsGroup) => {
    const words = [];
    const wordsWithDescriptions = [];

    paronymsGroup.forEach((paronym) => {
      const capitalizedWord = capitalize(paronym.word);

      words.push(capitalizedWord);
      wordsWithDescriptions.push(`*${capitalizedWord}* — ${paronym.description}`);
    });

    const wordsList = `- ${words.join('\n- ')}`;
    const wordsWithDescriptionsList = `- ${wordsWithDescriptions.join('\n- ')}`;

    return new Task(
      questionPrefix + wordsList,
      'Смотреть пояснение',
      new SelfCheckPrompt(),
      new TextExplanation(wordsWithDescriptionsList),
    );
  });
  shuffle(tasks);

  return new Training(title, tasks, {
    offerRepeat: true,
    automaticallyOpenExplanation: true,
  });
}
