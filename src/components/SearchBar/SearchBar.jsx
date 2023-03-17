import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Card } from '../Card/Card'
import './search-bar.css' 


export const SearchBar = () => {
  
  const { pickedRegion, filterPicked, searchValue, handleSearch } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const list = ['Filter by Region', 'Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania']

  const toggleFilterMenu = () => {
    (isOpen ? setIsOpen(false) : setIsOpen(true))
  }
  
  return (
    <main>
      <div className='search-filter-wrapper'>
        <input 
          type="text" 
          name="search" 
          className="search-input" 
          value={searchValue} 
          onChange={handleSearch} 
          placeholder='Search for a country...'
          />

        <div className='filter'>
          <button className="filter-reg" onClick={toggleFilterMenu} >{pickedRegion}<FontAwesomeIcon id='dropdown-icon' icon={faAngleDown}/></button>
          {isOpen ? (
            <div className='filter-options'>
              {list.map(x => (          
                <ul key={x} value={pickedRegion} onClick={filterPicked} >{x}</ul>
                )
              )}
            </div>
          ) : null
          }
        </div>
      </div>
      <Card/>
    </main>
  )
}
