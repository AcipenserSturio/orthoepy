import Test from '@/models/test';
import Task from '@/models/task';
import { RadioPrompt } from '@/models/prompts';

import { shuffle } from '@/utils';


export async function makeTest(topic, trainingType) {
  switch (trainingType) {
    case 'card':
      return _makeCardTest(topic);
    case 'test':
      return _makeTestTest(topic);
    default:
      return null;
  }
}

async function _makeCardTest(topic) {
  switch (topic) {
    case 'not-rules':
      return makeNotRulesTest();
    default:
      return null;
  }
}

async function _makeTestTest(topic) {
  switch (topic) {
    default:
      return null;
  }
}


// not rules

async function makeNotRulesTest() {
  const notRulesTree = await import('@/assets/not_rules_tree');

  const title = getNotRulesTestTitle();
  const tasks = getNotRulesTestTasks(notRulesTree);
  shuffle(tasks);

  return new Test(title, tasks);
}


function getNotRulesTestTitle() {
  return 'Слитное и раздельное правописание "не"';
}


function getNotRulesTestTasks(tree, pos = null) {
  let ruleTasks = [];

  if ('if' in tree) {
    const ifTasks = _getNotRulesTestIfTasks(tree, pos);
    ruleTasks.push(...ifTasks);
  } else if ('switch' in tree) {
    const switchTasks = _getNotRulesTestSwitchTasks(tree, pos);
    ruleTasks.push(...switchTasks);
  } else if ('spelling' in tree) {
    const spellingTasks = _getNotRulesTestSpellingTasks(tree, pos);
    ruleTasks.push(...spellingTasks);
  }

  return ruleTasks;
}

function _getNotRulesTestIfTasks(tree, pos) {
  let ruleTasks = [];

  const isTrueDeadlock = 'spelling' in tree['true'];
  const isFalseDeadlock = 'spelling' in tree['false'];
  if (!isTrueDeadlock) {
    throw new TypeError('Every "not" rule must have a truthy spelling');
  }

  const question = formatNotRulesTestTaskQuestion(tree['if'], pos);
  const answer = tree['true']['spelling'];
  const prompt = getNotRulesTestTaskPrompt();
  const explanation = null;

  const trueTask = new Task(question, answer, prompt, explanation);
  ruleTasks.push(trueTask);
  if (!isFalseDeadlock) {
    const falseTasks = getNotRulesTestTasks(tree['false'], pos);
    ruleTasks.push(...falseTasks);
  }

  return ruleTasks;
}

function _getNotRulesTestSwitchTasks(tree) {
  let ruleTasks = [];

  Object.entries(tree['cases']).forEach(([casePos, caseTree]) => {
    const caseTasks = getNotRulesTestTasks(caseTree, casePos);
    ruleTasks.push(...caseTasks);
  });

  return ruleTasks;
}

function _getNotRulesTestSpellingTasks(tree, pos) {
  const question = formatNotRulesTestTaskQuestion(null, pos);
  const answer = tree['spelling'];
  const prompt = getNotRulesTestTaskPrompt();
  const explanation = null;

  const task = new Task(question, answer, prompt, explanation);
  return [task];
}


function formatNotRulesTestTaskQuestion(question, pos) {
  switch ([Boolean(question), Boolean(pos)].join(' ')) {
    case 'true true':
      if (pos.split(', ').length === 1) {
        return `${question}. Часть речи: ${pos.toLowerCase()}.`;
      }
      return `${question}. Части речи: ${pos.toLowerCase()}.`;
    case 'true false':
      return `${question}.`;
    case 'false true':
      if (pos.split(', ').length === 1) {
        return `С частью речи: ${pos.toLowerCase()}.`;
      }
      return `С частями речи: ${pos.toLowerCase()}.`;
    default:
      throw new Error('At least "question" or "pos" must be specified');
  }
}

function getNotRulesTestTaskPrompt() {
  return new RadioPrompt([
    'Слитно',
    'Раздельно',
  ]);
}
