import Task from '@/models/task';
import Training from '@/models/training';
import { TextExplanation } from '@/models/explanations';
import { SelfCheckPrompt } from '@/models/prompts';
import { capitalize, shuffle } from '@/utils';

//
// Training: ege05-dictionary
//

async function makeTrainingEge05All() {
  const paronyms = (await import('@/assets/trainings/ege05__all.json')).default;

  const questionPrefix = '*Объясните каждое слово:*\n\n';

  const title = 'ЕГЭ. Задание 5. Все паронимы';
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

export default {
  makeAsyncTrainingFactories() {
    return {
      'ege05-all': async () => makeTrainingEge05All(),
    };
  },
};
