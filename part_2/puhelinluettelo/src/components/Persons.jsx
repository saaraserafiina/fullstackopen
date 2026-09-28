import PersonLine from "./PersonLine"

const Persons = ({persons, handleDelete}) => {

    return (
    <div>
        {persons.map(person => (
            <PersonLine key={person.id} 
            id={person.id} 
            name={person.name}
             number={person.number} 
             handleDelete={handleDelete}/>
        ))}
    </div>

    )

}

export default Persons