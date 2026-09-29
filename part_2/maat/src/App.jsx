import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import CountryDisplay from './components/CountryDisplay'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {

    console.log("Fetching data")
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
          setCountries(response.data)
      })

  }, [])


  const countriesToShow = countries.filter(countries => countries.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }
  

  if (countriesToShow.length > 10) {

    return (
      <div>
      find countries
      <input
      value={filter}
      onChange={handleFilterInput}
      />
        <p>
          Too many matches, specify another filter
        </p>
      </div>
    )
  } 
  else if (countriesToShow.length === 1) {

    console.log("one country")
    return (
      <div>
      find countries
      <input
      value={filter}
      onChange={handleFilterInput}
      />
      <CountryDisplay country={countriesToShow[0]} />
      </div>
    )

  }

  else {

  return (

    <div>
      find countries
      <input
      value={filter}
      onChange={handleFilterInput}
      />
      
    <Countries countries={countriesToShow} />
    
    </div>

  )
}

}

export default App