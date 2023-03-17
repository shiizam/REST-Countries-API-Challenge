import { useContext, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { BorderCountryButton } from '../BorderCountryButton/BorderCountryButton'
import './country-details.css'

export const CountryDetails = () => {
  const {findCountryByName, findAltSpelling} = useContext(AppContext)
  const { name } = useParams();
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/')
  }

  const country = useMemo(() => findCountryByName(name), [findCountryByName, name]);

  return (
    <main>
      <div className="back-btn">
        <button onClick={handleBackButton}>
          <FontAwesomeIcon 
          id='back-arrow' 
          icon={faCircleLeft} 
          alt='back-arrow-icon'
          /> 

          Back
        </button>
      </div>

      {country ? (
        <div className='details-body' key={`${country} + details`}>
          <img className='country-flag' src={country.flags.png}></img>
          <div className="main-details">
          <h2>{country.name.common}</h2>
            <p className='category' id='detail-name'>Native Name:<span>{Object.values(country.name.nativeName)[0].common}</span></p>
            <p className='category' id='detail-population'>Population:<span>{country.population.toLocaleString()}</span></p>
            <p className='category' id='detail-region'>Region:<span>{country.region}</span></p>
            <p className='category' id='detail-subregion'>Sub Region:<span>{country.subregion}</span></p>
            <p className='category' id='detail-capital'>Capital:<span>{country.capital}</span></p>
          </div>
          
          <div className="sub-details">
            <p className='category' id='detail-tld'>Top Level Domain:<span>{country.tld}</span></p>
            <p className='category' id='detail-currency'>Currencies:<span>{Object.values(country.currencies)[0].name}</span></p>
            <p className='category' id='detail-lang'>Languages:<span>{Object.values(country.languages)}</span></p>
          </div>

          {country.borders ? (
            <div className="border-country-btn">
              <h3 id='border-countries-title' className='category'>Border Countries:</h3>
                <div className="border-btn-grid">
                {country.borders.map((altSpelling) => {
                  const countryByAltName = findAltSpelling(altSpelling)
                  return <BorderCountryButton name={countryByAltName.name.common} key={countryByAltName.name.common}/>
                  })
                }
                </div>
            </div>
            ) : null
          }
        </div>
        ) : <></>
      }
    </main>
  )
}
