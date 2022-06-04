import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRegionsBasedOnCountry, selectRegions, getDataStatus } from '../redux/covid';
import Header from '../components/Header';

function Details() {
  const dispatch = useDispatch();
  const regions = useSelector(selectRegions);
  const status = useSelector(getDataStatus);
  const location = useLocation();

  const { date, country } = location.state;

  useEffect(() => {
    if (status === 'country-succeeded') {
      dispatch(fetchRegionsBasedOnCountry({ date, country }));
    }
  }, [dispatch, status, date, country]);

  return (
    <div className="container">
      <Header
        headerName={`Country: ${country}`}
        navbarTitle="Region-Based Covid Stats"
        miniTitle={`STATS BY REGIONS(${regions?.length})`}
        hasBack
      />
      <ul className="detail-parent">
        {
                    regions.length > 0
                      ? regions.map((region) => (
                        <li key={region.name} className="detail-list-item">
                          <p>{region.name}</p>
                          <p>
                            Confirmed Cases:&nbsp;
                            {region.today_confirmed}
                          </p>
                        </li>
                      ))
                      : (
                        <li className="detail-list-item">
                          <p>No Regions for this country</p>
                        </li>
                      )
}
      </ul>

    </div>
  );
}

export default Details;
