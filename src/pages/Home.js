import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries, selectAllCountries, getDataStatus } from '../redux/covid';
import countryISO from '../country-iso.json';
import Header from '../components/Header';

function Home() {
  const countries = useSelector(selectAllCountries);
  const status = useSelector(getDataStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [dispatch, status]);

  return (
    <div className="container">
      <Header
        headerName={status === 'loading' ? 'Loading...' : `Date: ${countries[0]?.date}`}
        navbarTitle="Country-Based Covid Stats"
        miniTitle="STATS BY COUNTRY"
        hasBack={false}
      />
      <ul className="country-list">
        {
                    countries && countries.map((country) => (
                      <li key={country.name} className="country-card">
                        <Link
                          to="/details"
                          state={{
                            country: country.name,
                            date: country.date,
                          }}
                          className="links"
                        >
                          <img className="img-map" src={`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${countryISO[country.name]?.toLowerCase()}/vector.svg`} alt={country.name} />
                          <p>{country.name}</p>
                          <p>
                            Confirmed Cases:
                            {country.today_confirmed}
                          </p>
                        </Link>
                      </li>
                    ))
                }
      </ul>
    </div>
  );
}

export default Home;
