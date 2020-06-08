import { makeTrainingLetterInsertion } from '@/trainer/factories';

export default {
  makeAsyncTrainingFactories() {
    return {
      'ege12-verbs-infinitives': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 12. Инфинитивы',
        'ege12__verbs_infinitives',
      ),
    };
  },
};
