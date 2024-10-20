// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const descriptions = {
  [Action.Add]: 'should add two numbers',
  [Action.Subtract]: 'should subtract two numbers',
  [Action.Multiply]: 'should multiply two numbers',
  [Action.Divide]: 'should divide two numbers',
  [Action.Exponentiate]: 'should exponentiate two numbers',
  wrongAction: 'should return null for invalid action',
  invalidArguments: 'should return null for invalid arguments',
};

type TestCase = {
  a: unknown;
  b: unknown;
  action: unknown;
  expected: unknown;
  description: string;
};

const testCases: TestCase[] = [
  {
    a: -1,
    b: -2,
    action: Action.Add,
    expected: -3,
    description: descriptions[Action.Add],
  },
  {
    a: 0,
    b: -0,
    action: Action.Add,
    expected: 0,
    description: descriptions[Action.Add],
  },
  {
    a: 3,
    b: 2,
    action: Action.Add,
    expected: 5,
    description: descriptions[Action.Add],
  },
  {
    a: 3,
    b: 2.5,
    action: Action.Add,
    expected: 5.5,
    description: descriptions[Action.Add],
  },
  // continue cases for other actions
  // Action.Subtract
  {
    a: 1,
    b: 2,
    action: Action.Subtract,
    expected: -1,
    description: descriptions[Action.Subtract],
  },
  {
    a: 2,
    b: 2,
    action: Action.Subtract,
    expected: 0,
    description: descriptions[Action.Subtract],
  },
  {
    a: 3,
    b: 2,
    action: Action.Subtract,
    expected: 1,
    description: descriptions[Action.Subtract],
  },
  {
    a: 3,
    b: 2.5,
    action: Action.Subtract,
    expected: 0.5,
    description: descriptions[Action.Subtract],
  },
  // Action.Multiply
  {
    a: 1,
    b: -2,
    action: Action.Multiply,
    expected: -2,
    description: descriptions[Action.Multiply],
  },
  {
    a: 2,
    b: 2,
    action: Action.Multiply,
    expected: 4,
    description: descriptions[Action.Multiply],
  },
  {
    a: 3,
    b: 0,
    action: Action.Multiply,
    expected: 0,
    description: descriptions[Action.Multiply],
  },
  {
    a: 3,
    b: 1.5,
    action: Action.Multiply,
    expected: 4.5,
    description: descriptions[Action.Multiply],
  },
  // Action.Divide
  {
    a: 3,
    b: -2,
    action: Action.Divide,
    expected: -1.5,
    description: descriptions[Action.Divide],
  },
  {
    a: 2,
    b: 2,
    action: Action.Divide,
    expected: 1,
    description: descriptions[Action.Divide],
  },
  {
    a: 2,
    b: 0.2,
    action: Action.Divide,
    expected: 10,
    description: descriptions[Action.Divide],
  },
  {
    a: 0,
    b: 3,
    action: Action.Divide,
    expected: 0,
    description: descriptions[Action.Divide],
  },
  {
    a: 3,
    b: 0,
    action: Action.Divide,
    expected: Infinity,
    description: descriptions[Action.Divide],
  },
  // Action.Exponentiate
  {
    a: 3,
    b: -2,
    action: Action.Exponentiate,
    expected: 0.1111111111111111,
    description: descriptions[Action.Exponentiate],
  },
  {
    a: 3,
    b: 1.5,
    action: Action.Exponentiate,
    expected: 5.196152422706632,
    description: descriptions[Action.Exponentiate],
  },
  {
    a: 2,
    b: 2,
    action: Action.Exponentiate,
    expected: 2 * 2,
    description: descriptions[Action.Exponentiate],
  },
  {
    a: 0,
    b: 3,
    action: Action.Exponentiate,
    expected: 0,
    description: descriptions[Action.Exponentiate],
  },
  {
    a: 3,
    b: 0,
    action: Action.Exponentiate,
    expected: 1,
    description: descriptions[Action.Exponentiate],
  },
  // wrong action and invalid arguments
  {
    a: 0,
    b: 3,
    action: 'wrongAction',
    expected: null,
    description: descriptions.wrongAction,
  },
  {
    a: '3',
    b: 0,
    action: Action.Exponentiate,
    expected: null,
    description: descriptions.invalidArguments,
  },
  {
    a: 3,
    b: '0',
    action: Action.Add,
    expected: null,
    description: descriptions.invalidArguments,
  },
  {
    a: '3',
    b: '0',
    action: Action.Add,
    expected: null,
    description: descriptions.invalidArguments,
  },
];

// Test all simpleCalculator actions and null check

describe('simpleCalculator', () => {
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)(
    '$description: simpleCalculator($a $action $b)',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
