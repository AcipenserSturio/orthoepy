import { makeTrainingStressSelecting } from '@/trainer/factories';

export default {
  makeAsyncTrainingFactories() {
    return {
      'ege04-adjs': async () => makeTrainingStressSelecting(
        'ЕГЭ. Задание 4. Ударение в прилагательных',
        'ege04__adjs',
      ),
      'ege04-advs': async () => makeTrainingStressSelecting(
        'ЕГЭ. Задание 4. Ударение в наречиях',
        'ege04__advs',
      ),
      'ege04-nouns': async () => makeTrainingStressSelecting(
        'ЕГЭ. Задание 4. Ударение в существительных',
        'ege04__nouns',
      ),
      'ege04-partics': async () => makeTrainingStressSelecting(
        'ЕГЭ. Задание 4. Ударение в причастиях',
        'ege04__partics',
      ),
      'ege04-verbs': async () => makeTrainingStressSelecting(
        'ЕГЭ. Задание 4. Ударение в глаголах',
        'ege04__verbs',
      ),
      'ege04-vpartics': async () => makeTrainingStressSelecting(
        'ЕГЭ. Задание 4. Ударение в деепричастиях',
        'ege04__vpartics',
      ),
    };
  },
};
