import { makeTrainingLetterInsertion } from '@/trainer/factories';

export default {
  makeAsyncTrainingFactories() {
    return {
      'ege11-12-verbs-infinitives-hard': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задания 11-12. Гласные в неопределенных формах глаголов перед -ТЬ (высокая сложность)',
        'ege11_12__verbs_infinitives_hard',
      ),
      'ege11-12-verbs-infinitives-medium': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задания 11-12. Гласные в неопределенных формах глаголов перед -ТЬ (средняя сложность)',
        'ege11_12__verbs_infinitives_medium',
      ),
    };
  },
};
