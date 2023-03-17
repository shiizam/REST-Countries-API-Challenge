import React from 'react'
import { useState, useEffect, createContext, useCallback } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import axios from 'axios'

import Theme from './components/Theme/Theme'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { CountryDetails } from './components/CountryDetails/CountryDetails'
import './index.css'


export const AppContext = createContext();
let globalCountryData = [];

function App() {
  const {theme: currentTheme, toggleTheme} = Theme();
  const isLight = currentTheme === 'light'
  const [countries,setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pickedRegion, setPickedRegion] = useState("Filter by Region");


  const findCountryByName = useCallback(
    (name) => {
      if (!countries) return;
      return countries.find((country) => country.name.common === name);
    },
    [countries]
  );

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=name,population,region,subregion,capital,flags,cca3,continents,tld,currencies,languages,borders")
    .then((res) => {
      const sorted = res.data.sort((a, b) => b.population - a.population);
      globalCountryData = sorted
      setCountries(sorted);
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  const findAltSpelling = (altSpelling) => {
    if (!countries) return;
    return countries.find((country) => country.cca3 === altSpelling);
  }

  const filterPicked = (e) => {
    setPickedRegion(e.target.innerHTML);
    let value = e.target.innerHTML;
    if (value !== 'Filter by Region') {
      let filterData = globalCountryData
      .filter((country) => country.region.toLowerCase().includes(value.toLowerCase()))
      setCountries(filterData);
    } else {
      return setCountries(globalCountryData);
    }
  }

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(e.target.value);
    if (value !== '') {
      let searchData;
      if (pickedRegion !== "Filter by Region") {
        searchData = globalCountryData.filter((x) => 
        x.name.common
          .toLowerCase()
          .includes(value.toLowerCase()) && x.region === pickedRegion
      );
      setCountries(searchData);
      } else {
          searchData = (globalCountryData.filter((x) => 
          x.name.common.toLowerCase().includes(value.toLowerCase())
          ));
          setCountries(searchData);
      }
    }
  }; 
  
  return (
    <div >
    <AppContext.Provider 
      value={
        {
          filterPicked, 
          isLight, 
          toggleTheme, 
          findCountryByName, 
          findAltSpelling, 
          countries, 
          setCountries, 
          pickedRegion, 
          searchValue, 
          setSearchValue, 
          handleSearch 
        }
      }>
      <Header />
      <Routes>
        <Route path='/' element={<SearchBar />} />
        <Route path="country/:name" element={<CountryDetails />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AppContext.Provider>
    </div>
  )
}

export default App
