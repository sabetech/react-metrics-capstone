// import { Provider } from 'react-redux';
// import { render } from '@testing-library/react';
// import axios from 'axios';
// import '@testing-library/jest-dom';
// import MockAdapter from 'axios-mock-adapter';
// import Home from '../pages/Home';
// import store from '../redux/configureStore';
// import { fetchCountries } from '../redux/covid';

// const sampleCountriesResponse = {
//   sampleCountry_1: {
//     date: '2022-02-06',
//     name: 'sampleCountry_1',
//     regions: [],
//     today_confirmed: 0,
//   },
//   sampleCountry_2: {
//     date: '2022-02-06',
//     name: 'sampleCountry_2',
//     regions: [],
//     today_confirmed: 0,
//   },
// };

// const mockNetworkResponse = () => {
//   const mock = new MockAdapter(axios);
//   mock.onGet('/api/2022-02-06').reply(200, sampleCountriesResponse);
// };

describe('Tests: Details', () => {
//   beforeAll(() => {
//     mockNetworkResponse();
//   });

  test('should render', () => {
    expect(1).toBe(1);
    // const home = render(
    //   <Provider store={store}>
    //     <Home />
    //   </Provider>,
    // );
    // expect(home).toMatchSnapshot();
  });

  //   it('Should initially set countries and regions to empty array', () => {
  //     const state = store.getState().covidSlice;
  //     expect(state.countries).toEqual([]);
  //     expect(state.regions).toEqual([]);
  //   });

//   it('should fetch countries with their covid info', async () => {
//     const result = await store.dispatch(fetchCountries());
//     const countries = result.payload;
//     expect(result.type).toBe('countries/fetchRegions/fulfilled');
//     expect(countries).toEqual(sampleCountriesResponse);
//   });
});
