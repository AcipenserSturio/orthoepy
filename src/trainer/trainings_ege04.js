import { makeTrainingStressChoosing } from '@/trainer/factories';

export default {
  makeAsyncTrainingGettersForCard() {
    return {};
  },
  makeAsyncTrainingGettersForChoose() {
    return {
      'ege04-adjs': async () => makeTrainingStressChoosing(
        'ЕГЭ. Задание 4. Ударение в прилагательных',
        'ege04__adjs',
      ),
      'ege04-advs': async () => makeTrainingStressChoosing(
        'ЕГЭ. Задание 4. Ударение в наречиях',
        'ege04__advs',
      ),
      'ege04-nouns': async () => makeTrainingStressChoosing(
        'ЕГЭ. Задание 4. Ударение в существительных',
        'ege04__nouns',
      ),
      'ege04-partics': async () => makeTrainingStressChoosing(
        'ЕГЭ. Задание 4. Ударение в причастиях',
        'ege04__partics',
      ),
      'ege04-verbs': async () => makeTrainingStressChoosing(
        'ЕГЭ. Задание 4. Ударение в глаголах',
        'ege04__verbs',
      ),
      'ege04-vpartics': async () => makeTrainingStressChoosing(
        'ЕГЭ. Задание 4. Ударение в деепричастиях',
        'ege04__vpartics',
      ),
    };
  },
  makeAsyncTrainingGettersForTest() {
    return {};
  },
};
