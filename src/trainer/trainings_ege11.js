import { makeTrainingLetterInsertion } from '@/trainer/factories';

export default {
  makeAsyncTrainingFactories() {
    return {
      'ege11-nouns-ik-ek': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИК- и -ЕК-',
        'ege11__nouns_ik_ek',
      ),
      'ege11-nouns-ic-ec': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИЦ- и -ЕЦ-',
        'ege11__nouns_ic_ec',
      ),
      'ege11-nouns-ichk-echk': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИЧК- и -ЕЧК-',
        'ege11__nouns_ichk_echk',
      ),
      'ege11-nouns-ink-enk': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ИНК- и -ЕНК-',
        'ege11__nouns_ink_enk',
      ),
      'ege11-nouns-onk-enk': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ОНЬК- и -ЕНЬК-',
        'ege11__nouns_onk_enk',
      ),
      'ege11-nouns-chik-shik': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с суффиксами -ЧИК- и -ЩИК-',
        'ege11__nouns_chik_shik',
      ),
      'ege11-nouns-const': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные с неизменяемыми суффиксами',
        'ege11__nouns_const',
      ),
      'ege11-nouns-mya': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Существительные на -МЯ',
        'ege11__nouns_mya',
      ),
      'ege11-adjs-iv-ev': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Прилагательные с суффиксами -ИВ- и -ЕВ-',
        'ege11__adjs_iv_ev',
      ),
      'ege11-adjs-onk-enk': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Прилагательные с суффиксами -ОНЬК- и -ЕНЬК-',
        'ege11__adjs_onk_enk',
      ),
      'ege11-adjs-ov-ev': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Прилагательные с суффиксами -ОВ-, -ОВАТ-, -ОВИТ- и -ЕВ-, -ЕВАТ-, -ЕВИТ-',
        'ege11__adjs_ov_ev',
      ),
      'ege11-adjs-const': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Прилагательные с неизменяемыми суффиксами',
        'ege11__adjs_const',
      ),
      'ege11-advs-o-a': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Наречия с суффиксами -О- и -А- (приставочно-суффиксальные)',
        'ege11__advs_o_a',
      ),
      'ege11-verbs-before-l': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Гласные в глаголах перед суффиксом -Л-',
        'ege11__verbs_before_l',
      ),
      'ege11-verbs-ova-eva-yiva-iva-va': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Глаголы с суффиксами -ОВА-, -ЕВА-, -ЫВА-, -ИВА- и -ВА-',
        'ege11__verbs_ova_eva_yiva_iva_va',
      ),
      'ege11-other-hsss-o-ieo': async () => makeTrainingLetterInsertion(
        'ЕГЭ. Задание 11. Гласные "о" и "ё" в суффиксах и окончаниях после шипящих',
        'ege11__other_hsss_o_ieo',
      ),
    };
  },
};
