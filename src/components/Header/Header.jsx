import './header.css'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'



export const Header = () => {
  const {isLight, toggleTheme} = useContext(AppContext)
  const navigate = useNavigate();

  const toggleHome = () => {
    navigate('/');
  }

  return (
    <div className='title-bar'>
      <button onClick={toggleHome}><h1>Where in the world?</h1></button>
      <button 
        id='theme-btn' 
        onClick={toggleTheme}
        >
        <FontAwesomeIcon 
        id='icon' 
        icon={isLight ? faSun : faMoon}
        />
        Dark Mode
      </button>
    </div>
  )
}
