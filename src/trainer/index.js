import trainingsNot from '@/trainer/trainings_not';
import trainingsEge04 from '@/trainer/trainings_ege04';
import trainingsEge11 from '@/trainer/trainings_ege11';
import trainingsEge12 from '@/trainer/trainings_ege12';

const asyncTrainingFactories = {
  ...trainingsNot.makeAsyncTrainingFactories(),
  ...trainingsEge04.makeAsyncTrainingFactories(),
  ...trainingsEge11.makeAsyncTrainingFactories(),
  ...trainingsEge12.makeAsyncTrainingFactories(),
};

/* eslint-disable-next-line import/prefer-default-export */
export async function getTraining(topic) {
  const makeTraining = asyncTrainingFactories[topic];
  return !makeTraining ? null : makeTraining();
}
