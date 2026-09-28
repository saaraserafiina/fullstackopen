import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (window.confirm(newName + ' is already added to phonebook, do you want to replace the number?')) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNotification('Persons ' + personObject.name + ' number succesfully changed')
            setTimeout(() => {
            setNotification(null)
            }, 2000)
            setNewName('')
            setNewNumber('')
          })

      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNotification('Person ' + personObject.name + ' succesfully added')
        setTimeout(() => {
        setNotification(null)
        }, 2000)
        setNewNumber('')
      })

  }

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const handleNumberChange = (event) => {

    setNewNumber(event.target.value)
  }

  const handleDelete = (id) => {

    const person = persons.find(p => p.id === id)

    if (window.confirm("Delete " + person.name + "?")) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        setNotification("Person " + person.name + " succesfully deleted.")
        setTimeout(() => {
        setNotification(null)
        }, 2000)
    }
  }

  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
        handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )


}
export default App