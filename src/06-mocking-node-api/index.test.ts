import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const mockTimeout = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, mockTimeout);
    expect(setTimeout).toBeCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, mockTimeout);
    expect(mockCallback).not.toBeCalled();

    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();

    doStuffByInterval(mockCallback, mockTimeout);
    expect(mockCallback).not.toBeCalled();
    expect(setInterval).toBeCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();

    doStuffByInterval(mockCallback, mockTimeout);
    expect(mockCallback).not.toBeCalled();

    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toBeCalledTimes(1);

    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toBeCalledTimes(2);

    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toBeCalledTimes(3);
  });
});

const mockData = 'Hello';

jest.mock('path', () => ({
  join: jest.fn((...args: string[]) => args.join('/')),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  let pathToFile: string;

  beforeAll(() => {
    pathToFile = 'test.txt';
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const data = await readFileAsynchronously(pathToFile);

    expect(data).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockData);
    const data = await readFileAsynchronously(pathToFile);

    expect(typeof data).toBe('string');
    expect(data).toBe(mockData);
  });
});
