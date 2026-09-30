const Country = ({country, onSelect}) => {

    return (

        <li>
            {country.name.common} 
            <button type="button" onClick={() => onSelect(country)}>Show</button>
        </li>
    )

}

export default Country