// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(result).toEqual(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Subtract });
    expect(result).toEqual(-1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: Action.Multiply });
    expect(result).toEqual(10);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: Action.Divide });
    expect(result).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 6,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toEqual(6 * 6);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: 'paw' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 10, b: '5', action: Action.Divide });
    expect(result).toBeNull();
  });
});
