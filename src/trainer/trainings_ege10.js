import { makeTrainingLetterInsertion } from '@/trainer/factories';

export default {
  makeAsyncTrainingFactories() {
    return {
      'ege10-i-y-misc': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 10. Гласная "и" и "ы" после приставок',
        'ege10__i_y_misc',
      ),
      'ege10-pra-pro-misc': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 10. Приставки ПРА- и ПРО-',
        'ege10__pra_pro_misc',
      ),
      'ege10-pre-pri-misc': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 10. Приставки ПРЕ- и ПРИ- (разные случаи с объяснениями)',
        'ege10__pre_pri_misc',
      ),
      'ege10-pre-pri-difficult': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 10. Приставки ПРЕ- и ПРИ- (сложные случаи)',
        'ege10__pre_pri_difficult',
      ),
      'ege10-ro-ra-misc': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 10. Приставки РАЗ-/РАС- и РОЗ-/РОС-',
        'ege10__ro_ra_misc',
      ),
      'ege10-soft-hard-misc': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 10. Мягкий и твердый знак после приставок',
        'ege10__soft_hard_misc',
      ),
      'ege10-z-s-misc': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 10. Приставки на "с" и "з"',
        'ege10__z_s_misc',
      ),
    };
  },
};
