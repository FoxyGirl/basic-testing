// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'Test value';
    const val = await resolveValue(testValue);
    expect(val).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    const errMessage = 'Crash!';

    expect(() => throwError(errMessage)).toThrow(errMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(() => throwError()).toThrow('Oops!');
  });
});

const defaultAwesomeErrorMessage = 'This is my awesome custom error!';

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(throwCustomError).toThrow(MyAwesomeError);

    expect(throwCustomError).toThrow(defaultAwesomeErrorMessage);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError).rejects.toThrow(defaultAwesomeErrorMessage);
  });
});
