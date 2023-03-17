import { useContext } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'

import './border-country-button.css'

export const BorderCountryButton = ({name}) => {
  const navigate = useNavigate();

  const handleClickedBorderCountry = () => {
    navigate(`/country/${name}`, {replace: false})
  }

  return (
    <button className='border-btn' onClick={handleClickedBorderCountry}>{name}</button>
  )
}
