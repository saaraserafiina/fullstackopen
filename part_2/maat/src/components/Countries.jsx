import Country from "./Country"

const Countries = ({countries, onSelect}) => {

    return (

        <div>
            
            {countries.map(country => (
                <Country key={country.name.common}
                country={country}
                onSelect={onSelect} />
            ))}
            
        </div>
    )
}

export default Countries