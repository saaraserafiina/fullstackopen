const PersonLine = ( {id, name, number, handleDelete}) => {

    return (
    <li> {name} {number}
    <button onClick={() => handleDelete(id)}>Delete</button>

    </li>
    )
}

export default PersonLine