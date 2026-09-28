import { useState, useEffect } from 'react'
import Persons from  './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {

    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {


    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log("new name is", personObject)

    if (persons.some(person => person.name === personObject.name)) {
      window.alert(newName + ' is already added to phonebook')
      return
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
            console.log(response.data)
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
      })




  }

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }



  const handleNumberChange = (event) => {

    setNewNumber(event.target.value)
  }

  
  const handleNameChange = (event) => {

    console.log("handle name change", event.target.value)
    setNewName(event.target.value)
  }
  
  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      filter shown with
      <input value={filter}
            onChange={handleFilterInput}>
      
      </input>
      </div>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  handleNameChange={handleNameChange} 
                  newNumber={newNumber} 
                  handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
        <Persons persons={personsToShow} />
    </div>
  )


}
export default App