import Country from "./Country"

const Countries = ({countries}) => {

    return (

        <div>
            
            {countries.map(country => (
                <Country key={country.name.common}
                name={country.name.common} />
            ))}
        </div>
    )
}

export default Countries