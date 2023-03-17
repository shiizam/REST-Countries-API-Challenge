import { useContext } from 'react'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import './card.css'

export const Card = () => {
  const { countries } = useContext(AppContext)
  
  return (
    <div className="card-grid">
      {countries.map((item, index) => (
      <Link className='link' to={`country/${item.name.common}`} key={`${item.name.common} ${index}`}>
      <div className='card' >
        <div className="card-header">
          <img src={item.flags.png}></img>
        </div>
        <div className="card-body">
          <h2>{item.name.common}</h2>
          <p className='category'>Population: <span className='cat-details'>{item.population.toLocaleString()}</span> </p>
          <p className='category'>Region: <span className='cat-details'>{item.region}</span> </p>
          <p className='category'>Capital: <span className='cat-details'>{item.capital}</span> </p>
        </div>
      </div>
      </Link>
        )
      )}
    </div>
  )
}

