import { makeTrainingNNnSelecting } from '@/trainer/factories';

export default {
  makeAsyncTrainingFactories() {
    return {
      'ege15-n-nn-exceptions': async () => makeTrainingNNnSelecting(
        'ЕГЭ. Задания 15. Исключения -Н-/-НН-',
        'ege15__n_nn_exceptions',
      ),
    };
  },
};
