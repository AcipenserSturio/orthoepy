import { RadioPrompt } from '@/models/prompts_v2';
import Task from '@/models/task';
import { shuffle } from '@/utils';
import Training from '@/models/training';
import { RuleChainExplanation } from '@/models/explanations';

//
// Training: not-rules
//

async function makeTrainingNotRules() {
  const deadlockRules = (await import('@/assets/trainings/not__deadlock_rules')).default;

  const title = 'Слитное и раздельное правописание НЕ';
  const tasks = deadlockRules.map((deadlockRule) => {
    const { pos, rule, spelling } = deadlockRule;

    let statement;
    if (rule) {
      statement = `${rule}.`;
    } else if (pos.split(', ').length === 1) {
      statement = `С частью речи: ${pos.toLowerCase()}.`;
    } else {
      statement = `С частями речи: ${pos.toLowerCase()}.`;
    }

    return new Task(
      statement,
      spelling,
      new RadioPrompt(['Слитно', 'Раздельно']),
      null,
    );
  });
  shuffle(tasks);

  return new Training(title, tasks, {});
}

//
// Training: not-algorithm
//

async function makeTrainingNotAlgorithm() {
  const deadlockRules = (await import('@/assets/trainings/not__deadlock_rules')).default;
  const deadlockTasks = (await import('@/assets/trainings/not__deadlock_tasks')).default;
  const deadlockRuleChains = (await import('@/assets/trainings/not__deadlock_rule_chains')).default;

  // find a deadlock index with tasks
  let deadlockIndex;
  while (!deadlockIndex) {
    const potentialIndex = Math.floor(Math.random() * deadlockTasks.length);
    if (deadlockTasks[potentialIndex].length) {
      deadlockIndex = potentialIndex;
    }
  }
  const deadlockTaskIndex = Math.floor(
    Math.random() * deadlockTasks[deadlockIndex].length,
  );

  const deadlockTask = deadlockTasks[deadlockIndex][deadlockTaskIndex];
  const deadlockRuleChain = deadlockRuleChains[deadlockIndex];
  const lastDeadlockRuleIndex = deadlockRuleChain[deadlockRuleChain.length - 1];

  const title = 'Алгоритм "Слитно или раздельно?"';
  const tasks = [];
  let hasPosTask = false;
  const questionPrefix = `*${deadlockTask}*\n\n`;

  deadlockRuleChain.forEach((deadlockRuleIndex) => {
    const deadlockRule = deadlockRules[deadlockRuleIndex];
    const { pos, rule, spelling } = deadlockRule;

    if (!hasPosTask && pos) {
      tasks.push(new Task(
        `${questionPrefix}Какая часть речи?`,
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
        `${questionPrefix}${rule} (${spelling.toLowerCase()}).`,
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

  return new Training(title, tasks, {
    hideProgress: true,
    offerRepeat: true,
  });
}

//
// Training: not-tasks
//

async function makeTrainingNotTasks() {
  const deadlockRules = (await import('@/assets/trainings/not__deadlock_rules')).default;
  const deadlockTasks = (await import('@/assets/trainings/not__deadlock_tasks')).default;
  const deadlockRuleChains = (await import('@/assets/trainings/not__deadlock_rule_chains')).default;

  const deadlockShuffledTaskIndices = deadlockTasks.map(
    tasksAtDeadlock => shuffle([...Array(tasksAtDeadlock.length).keys()]),
  );
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
    if (deadlockTaskIndex !== undefined) {
      deadlockPickedTaskIndices[deadlockIndex].push(deadlockTaskIndex);
      pickedTasksCount += 1;
    }
  }

  const title = 'Слитное и раздельное правописание "не"';
  const tasks = [];
  Object.entries(deadlockPickedTaskIndices).forEach(
    ([deadlockIndex, pickedDeadlockTaskIndices]) => {
      pickedDeadlockTaskIndices.forEach((deadlockTaskIndex) => {
        const deadlockTask = deadlockTasks[deadlockIndex][deadlockTaskIndex];
        const deadlockRuleChain = deadlockRuleChains[deadlockIndex];

        const { spelling: correctSpelling } = deadlockRules[deadlockIndex];
        const explanation = new RuleChainExplanation(
          deadlockRuleChain.map((deadlockIdx) => {
            const deadlockRule = deadlockRules[deadlockIdx];

            const { pos, rule, spelling } = deadlockRule;
            if (rule) {
              return `${rule} (${spelling.toLowerCase()}).`;
            }
            if (pos.split(', ').length === 1) {
              return `С частью речи: ${pos.toLowerCase()} — в любом другом случае пишем ${spelling.toLowerCase()}.`;
            }
            return `С частями речи: ${pos.toLowerCase()} — в любом другом случае пишем ${spelling.toLowerCase()}.`;
          }),
          correctSpelling,
        );

        const task = new Task(
          deadlockTask,
          correctSpelling,
          new RadioPrompt(['Слитно', 'Раздельно']),
          explanation,
        );
        tasks.push(task);
      });
    },
  );
  shuffle(tasks);

  return new Training(title, tasks, {});
}

//
// Default Export
//

export default {
  makeAsyncTrainingFactories() {
    return {
      'not-rules': async () => makeTrainingNotRules(),
      'not-algorithm': async () => makeTrainingNotAlgorithm(),
      'not-tasks': async () => makeTrainingNotTasks(),
    };
  },
};
