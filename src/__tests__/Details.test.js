import axios from 'axios';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import store from '../redux/configureStore';
import reducer, { fetchRegionsBasedOnCountry } from '../redux/covid';

const sampleDetailsResponse = [
  {
    sampleCountry_1: {
      date: '2022-02-06',
      name: 'sampleCountry_1',
      regions: [],
      today_confirmed: 0,
    },
  },
  {
    sampleCountry_2: {
      date: '2022-02-06',
      name: 'sampleCountry_2',
      regions: [],
      today_confirmed: 0,
    },
  },
];

const mockNetworkResponse = () => {
  const mock = new MockAdapter(axios);
  mock.onGet('https://api.covid19tracking.narrativa.com/api/2022-02-06/country/brazil').reply(200, sampleDetailsResponse);
};

describe('Tests: Homepage', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });

  it('Should initially set regions to empty array', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        countries: [],
        regions: [],
        status: 'idle',
        error: null,
      },
    );
  });

  it('should fetch regions successfully with their covid info', async () => {
    const result = await store.dispatch(fetchRegionsBasedOnCountry({ country: 'Brazil', date: '2022-02-06' }));
    expect(result.type).toBe('countries/fetchRegions/fulfilled');
  });
});
