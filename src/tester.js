import Test from '@/models/test';
import Task from '@/models/task';
import { RadioPrompt } from '@/models/prompts';
import { RuleChainExplanation } from '@/models/explanations';
import { shuffle } from '@/utils';


const asyncTestGetters = {
  card: {
    'not-rules': async () => getNotRulesTest(),
    'not-algorithm': async () => getNotAlgorithmTest(),
  },
  test: {
    'not-tasks': async () => getNotTasksTest(),
  },
};

export async function getTest(topic, trainingType) {
  const asyncTrainingTestGetters = asyncTestGetters[trainingType];
  if (!asyncTrainingTestGetters) {
    return null;
  }

  const asyncGetTest = asyncTrainingTestGetters[topic];
  if (!asyncGetTest) {
    return null;
  }

  return asyncGetTest();
}


async function getNotRulesTest() {
  
}


async function getNotAlgorithmTest() {

}


async function getNotTasksTest() {

}
