import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import Home from '../pages/Home';
import store from '../redux/configureStore';
import reducer, { fetchCountries } from '../redux/covid';

const sampleCountriesResponse = [
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
  mock.onGet('https://api.covid19tracking.narrativa.com/api/2022-02-06').reply(200, sampleCountriesResponse);
};

describe('Tests: Homepage', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });

  it('should render', () => {
    const tree = renderer.create(
      <React.StrictMode>
        <Router>
          <Provider store={store}>
            <Home />
          </Provider>
        </Router>
      </React.StrictMode>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should initially set countries to empty array', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        countries: [],
        regions: [],
        status: 'idle',
        error: null,
      },
    );
  });

  it('should fetch countries successfully with their covid info', async () => {
    const result = await store.dispatch(fetchCountries());
    expect(result.type).toBe('countries/fetchCountries/fulfilled');
  });
});
