import trainingsNot from '@/trainer/trainings_not';
import trainingsEge11 from '@/trainer/trainings_ege11';
import trainingsEge12 from '@/trainer/trainings_ege12';

const asyncTrainingGetters = {
  card: {
    ...trainingsNot.makeAsyncTrainingGettersForCard(),
    ...trainingsEge11.makeAsyncTrainingGettersForCard(),
    ...trainingsEge12.makeAsyncTrainingGettersForCard(),
  },
  choose: {
    ...trainingsNot.makeAsyncTrainingGettersForChoose(),
    ...trainingsEge11.makeAsyncTrainingGettersForChoose(),
    ...trainingsEge12.makeAsyncTrainingGettersForChoose(),
  },
  test: {
    ...trainingsNot.makeAsyncTrainingGettersForTest(),
    ...trainingsEge11.makeAsyncTrainingGettersForTest(),
    ...trainingsEge12.makeAsyncTrainingGettersForTest(),
  },
};

/* eslint-disable-next-line import/prefer-default-export */
export async function getTraining(topic, type) {
  const typedGetters = asyncTrainingGetters[type];
  const getter = !typedGetters ? null : typedGetters[topic];
  return !getter ? null : getter();
}
