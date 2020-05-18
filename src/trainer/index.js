import trainingsNot from '@/trainer/trainings_not';
import trainingsEge11 from '@/trainer/trainings_ege11';

const asyncTrainingGetters = {
  card: {
    ...trainingsNot.makeAsyncTrainingGettersForCard(),
    ...trainingsEge11.makeAsyncTrainingGettersForCard(),
  },
  test: {
    ...trainingsNot.makeAsyncTrainingGettersForTest(),
    ...trainingsEge11.makeAsyncTrainingGettersForTest(),
  },
};

/* eslint-disable-next-line import/prefer-default-export */
export async function getTraining(topic, type) {
  const typedGetters = asyncTrainingGetters[type];
  const getter = !typedGetters ? null : typedGetters[topic];
  return !getter ? null : getter();
}
