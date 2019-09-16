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
  const deadlockRules = (await import('@/assets/not_deadlock_rules')).default;

  const title = 'Слитное и раздельное правописание "не"';
  let tasks = deadlockRules.map((deadlockRule) => {
    const pos = deadlockRule.pos;
    const rule = deadlockRule.rule;
    const spelling = deadlockRule.spelling;

    let title;
    if (rule) {
      title = `${rule}.`;
    } else if (pos.split(', ').length === 1) {
      title = `С частью речи: ${pos.toLowerCase()}.`;
    } else {
      title = `С частями речи: ${pos.toLowerCase()}.`;
    }

    return new Task(
      title,
      spelling,
      new RadioPrompt(['Слитно', 'Раздельно']),
      null,
    );
  });
  shuffle(tasks);

  return new Test(title, tasks);
}


async function getNotAlgorithmTest() {

}


async function getNotTasksTest() {

}
