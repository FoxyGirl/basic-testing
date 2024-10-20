// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let balance: number;
  let account: BankAccount | null;

  beforeEach(() => {
    balance = 500;
    account = getBankAccount(balance);
  });

  afterEach(() => {
    balance = 0;
    account = null;
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    // Write your test here
    expect(account?.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const withdrawAmount = 1000;

    expect(() => account?.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const amount = 1200;
    const toAccount = getBankAccount(0);

    expect(() => account?.transfer(amount, toAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const amount = 1200;

    expect(() => account?.transfer(amount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    // Write your test here
    const depositAmount = 500;

    expect(account?.deposit(depositAmount).getBalance()).toBe(
      balance + depositAmount,
    );
  });

  test('should withdraw money', () => {
    // Write your test here
    const withdrawAmount = 500;

    expect(account?.withdraw(withdrawAmount).getBalance()).toBe(
      balance - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    // Write your test here
    const amount = 50;

    const accountBalance = 0;
    const toAccount = getBankAccount(accountBalance);

    account?.transfer(amount, toAccount);

    expect(account?.getBalance()).toBe(balance - amount);
    expect(toAccount.getBalance()).toBe(accountBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const fetchedBalance = await account?.fetchBalance();

    // TODO: how can be handled null result?
    console.log('==== fetchedBalance', fetchedBalance);
    if (fetchedBalance !== null) {
      expect(typeof fetchedBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const mockFetchedBalance = 500;

    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockResolvedValue(mockFetchedBalance);

    await account?.synchronizeBalance();

    expect(account?.fetchBalance).toHaveBeenCalled();
    expect(account?.getBalance()).toBe(mockFetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const mockFetchedBalance = null;
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockResolvedValue(mockFetchedBalance);

    await expect(account?.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    expect(account?.fetchBalance).toHaveBeenCalled();
  });
});
