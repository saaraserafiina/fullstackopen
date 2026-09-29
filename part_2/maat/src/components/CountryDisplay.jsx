import Languages from "./Languages"

const CountryDisplay = ({country}) => {

    return (
        <div>
            <h2> {country.name.common}</h2>
            <p>
                Capital: {country.capital[0]}
                </p>
            <p>
             Area: {country.area} 
            </p>
            <img src={country.flags.png} />
            <h2>Languages</h2>
            <Languages languages={country.languages} /> 
        </div>
    )

}

export default CountryDisplay