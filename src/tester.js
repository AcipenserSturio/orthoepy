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

  return new Test(title, tasks, {});
}


async function getNotAlgorithmTest() {
  const deadlockRules = (await import('@/assets/not_deadlock_rules')).default;
  const deadlockTasks = (await import('@/assets/not_deadlock_tasks')).default;
  const deadlockRuleChains = (await import('@/assets/not_deadlock_rule_chains')).default;

  // find a deadlock index with tasks
  let deadlockIndex;
  while (!deadlockIndex) {
    const potentialIndex = Math.floor(Math.random() * deadlockTasks.length);
    if (deadlockTasks[potentialIndex].length) {
      deadlockIndex = potentialIndex
    }
  }
  const deadlockTaskIndex = Math.floor(Math.random() * deadlockTasks[deadlockIndex].length);

  const deadlockTask = deadlockTasks[deadlockIndex][deadlockTaskIndex];
  const deadlockRuleChain = deadlockRuleChains[deadlockIndex];
  const lastDeadlockRuleIndex = deadlockRuleChains[deadlockRuleChains.length - 1];

  const title = `Алгоритм "Слитно или раздельно?"`;
  const tasks = [];
  let hasPosTask = false;
  const questionPrefix = `*${deadlockTask}*\n\n`;

  deadlockRuleChain.forEach((deadlockRuleIndex) => {
    const deadlockRule = deadlockRules[deadlockRuleIndex];

    const pos = deadlockRule.pos;
    const rule = deadlockRule.rule;
    const spelling = deadlockRule.spelling;

    if (!hasPosTask && pos) {
      tasks.push(new Task(
        questionPrefix + 'Какая часть речи?',
        pos,
        new RadioPrompt([
          'Числительное',
          'Глагол, деепричастие, краткое причастие',
          'Производный предлог, неопределенное местоимение',
          'Полное причастие',
          'Наречие',
          'Прилагательное',
          'Существительное',
        ]),
        null,
      ));
      hasPosTask = true;
    }

    if (rule) {
      const answer = deadlockRuleIndex === lastDeadlockRuleIndex
        ? 'Да'
        : 'Нет';

      tasks.push(new Task(
        questionPrefix + `${rule} (${spelling.toLowerCase()}).`,
        answer,
        new RadioPrompt(['Да', 'Нет']),
        null,
      ));
    } else {
      const question = pos.split(', ').length === 1
        ? `С частью речи: ${pos.toLowerCase()} — в любом другом случае пишем`
        : `С частями речи: ${pos.toLowerCase()} — в любом другом случае пишем`;

      tasks.push(new Task(
        questionPrefix + question,
        spelling,
        new RadioPrompt(['Слитно', 'Раздельно']),
        null,
      ));
    }
  });

  return new Test(title, tasks, {
    hideProgress: true,
    offerRepeat: true,
  });
}


async function getNotTasksTest() {
  const deadlockRules = (await import('@/assets/not_deadlock_rules')).default;
  const deadlockTasks = (await import('@/assets/not_deadlock_tasks')).default;
  const deadlockRuleChains = (await import('@/assets/not_deadlock_rule_chains')).default;

  const deadlockShuffledTaskIndices = deadlockTasks.map((tasksAtDeadlock) => {
    return shuffle([...Array(tasksAtDeadlock.length).keys()]);
  });
  const deadlockIndices = Array(deadlockTasks.length).keys();
  const shuffledDoubledDeadlockIndices = shuffle(
    [].concat([...deadlockIndices], [...deadlockIndices]),
  );

  const deadlockPickedTaskIndices = new Array(deadlockTasks.length);
  for (let i = 0; i < deadlockTasks.length; i += 1) {
    deadlockPickedTaskIndices[i] = [];
  }

  let shuffledDoubledDeadlockIndicesIndex = 0;
  let pickedTasksCount = 0;
  while (pickedTasksCount < 20) {
    shuffledDoubledDeadlockIndicesIndex += 1;
    const deadlockIndex = shuffledDoubledDeadlockIndices[shuffledDoubledDeadlockIndicesIndex];
    const deadlockTaskIndex = deadlockShuffledTaskIndices[deadlockIndex].pop();
    if (deadlockTaskIndex === undefined) {
      continue;
    }
    deadlockPickedTaskIndices[deadlockIndex].push(deadlockTaskIndex);
    pickedTasksCount += 1;
  }

  let title = 'Слитное и раздельное правописание "не"';
  let tasks = [];
  Object.entries(deadlockPickedTaskIndices).forEach(([deadlockIndex, pickedDeadlockTaskIndices]) => {
    pickedDeadlockTaskIndices.forEach((deadlockTaskIndex) => {
      const deadlockTask = deadlockTasks[deadlockIndex][deadlockTaskIndex];
      const deadlockRuleChain = deadlockRuleChains[deadlockIndex];

      const spelling = deadlockRules[deadlockIndex].spelling;
      const explanation = new RuleChainExplanation(
        deadlockRuleChain.map((deadlockIndex) => {
          const deadlockRule = deadlockRules[deadlockIndex];

          const pos = deadlockRule.pos;
          const rule = deadlockRule.rule;
          const spelling = deadlockRule.spelling;
          if (rule) {
            return `${rule} (${spelling.toLowerCase()}).`;
          } else if (pos.split(', ').length === 1) {
            return `С частью речи: ${pos.toLowerCase()} — в любом другом случае пишем ${spelling.toLowerCase()}.`;
          } else {
            return `С частями речи: ${pos.toLowerCase()} — в любом другом случае пишем ${spelling.toLowerCase()}.`;
          }
        }),
        spelling,
      );

      const task = new Task(
        deadlockTask,
        spelling,
        new RadioPrompt(['Слитно', 'Раздельно']),
        explanation,
      );
      tasks.push(task);
    });
  });
  shuffle(tasks);

  return new Test(title, tasks, {});
}
