const Languages = ({languages}) => {

    const languageNames = Object.values(languages)

    return (
        <ul>
            {languageNames.map(language => (
                <li key={language}>{language}</li>
            ))}
        </ul>
    )

}

export default Languages