const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()

const Person = require('./models/person')

const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))



app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {

    response.json(persons);

  })
})


app.delete('/api/persons/:id', (request, response) => {


  const id = request.params.id

  Person.findByIdAndDelete(id).then(() => {

    response.status(204).end()

  })

})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is required' 
    })
  }
  if (!body.number) {
    return response.status(400).json({
        error: 'number is required'
    })
  }

  const person = new Person({
    
    name: request.body.name,
    number: request.body.number
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

});



const PORT = process.env.PORT || 3001


morgan.token('body', req => { 
    return JSON.stringify(req.body) 
})


app.listen(PORT)
console.log(`Server running on port ${PORT}`)