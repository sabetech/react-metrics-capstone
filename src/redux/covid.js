/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const covidBaseUrl = 'https://api.covid19tracking.narrativa.com';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  try {
    const response = await axios.get(`${covidBaseUrl}/api/2022-02-10`);
    const { countries } = response.data.dates[Object.keys(response.data.dates)[0]];
    const countryKeys = Object.keys(countries);
    const countryData = countryKeys.map(
      (countryKey) => countries[countryKey],
    ).filter((_, i) => i < 60);

    return countryData;
  } catch (err) {
    return err.message;
  }
});

export const fetchRegionsBasedOnCountry = createAsyncThunk('countries/fetchRegions', async ({ country, date }) => {
  try {
    const response = await axios.get(`${covidBaseUrl}/api/${date}/country/${country}`);
    const { regions } = response.data.dates[date].countries[country];
    return regions;
  } catch (err) {
    return err.message;
  }
});

export const covidSlice = createSlice({
  name: 'covidslice',
  initialState: {
    countries: [],
    regions: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setIdle: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'country-succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRegionsBasedOnCountry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegionsBasedOnCountry.fulfilled, (state, action) => {
        state.status = 'region-succeeded';
        state.regions = action.payload;
      })
      .addCase(fetchRegionsBasedOnCountry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIdle } = covidSlice.actions;
export const selectAllCountries = (state) => state.covid.countries;
export const selectRegions = (state) => state.covid.regions;
export const getDataStatus = (state) => state.covid.status;
export const getDataError = (state) => state.covid.error;

export default covidSlice.reducer;
