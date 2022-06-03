import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, selectAllCountries, getDataStatus } from '../redux/covid';
import countryISO from "../country-iso.json";



function Home() {
    const countries = useSelector(selectAllCountries);
    const status = useSelector(getDataStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle'){
            dispatch(fetchCountries());
        }
    },[dispatch, status]);
    
    return (
        <div className="container">
            <nav>
                <h3>Country-Based Covid Stats</h3>
            </nav>
            <div className="sticky-header">
                <div className="card-label">
                    <p>Date: Date Here!</p>
                </div>
                <div className="stats-by-country">
                    <p>STATS BY COUNTRY</p>
                </div>
            </div>
            <ul className="country-list">
                {
                    countries.map((country, i) => {
                        
                        return (
                            <li key={i} className="country-card">
                                <img className="img-map" src={`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${countryISO[country.name]?.toLowerCase()}/vector.svg`} alt="gh"/>
                                <p>{country.name}</p>
                                <p>Confirmed Cases: {country.today_confirmed}</p>
                            </li>
                        )
                    }
                    
                    )
                }
            </ul>
        </div>
    );
}

export default Home;