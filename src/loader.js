import { Test } from '@/models';

const testPathsForTrainings = {
  card: {
    test: 'assets/test.json',
  },
  test: {
    test: 'assets/test.json',
  },
};

export async function loadTest(topic, trainingType) {
  const testPaths = testPathsForTrainings[trainingType];
  if (!testPaths) {
    return null;
  }

  const path = testPaths[topic];
  if (!path) {
    return null;
  }

  let rawTest;
  try {
    rawTest = await import(`@/${path}`);
  } catch (e) {
    return null;
  }

  return new Test(rawTest);
}
