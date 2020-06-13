import trainingsNot from '@/trainer/trainings_not';
import trainingsEge04 from '@/trainer/trainings_ege04';
import trainingsEge05 from '@/trainer/trainings_ege05';
import trainingsEge11 from '@/trainer/trainings_ege11';
import trainingsEge12 from '@/trainer/trainings_ege12';

const asyncTrainingFactories = {
  ...trainingsNot.makeAsyncTrainingFactories(),
  ...trainingsEge04.makeAsyncTrainingFactories(),
  ...trainingsEge05.makeAsyncTrainingFactories(),
  ...trainingsEge11.makeAsyncTrainingFactories(),
  ...trainingsEge12.makeAsyncTrainingFactories(),
};

export default async function getTraining(topic) {
  const makeTraining = asyncTrainingFactories[topic];
  return !makeTraining ? null : makeTraining();
}
