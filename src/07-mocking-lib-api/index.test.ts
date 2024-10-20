// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((func) => func),
}));

const relativePath = '/testPath';
const url = 'https://test-url.com';

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: null }),
    });

    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: null });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    await throttledGetDataFromApi(url);
    expect(mockGet).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const responseData = { data: 'Some data from API' };

    const mockGet = jest.fn().mockResolvedValue({ data: responseData });
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    const result = await throttledGetDataFromApi(url);
    expect(result).toEqual(responseData);
  });
});
