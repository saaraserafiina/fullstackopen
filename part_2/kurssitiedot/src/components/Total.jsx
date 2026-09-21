
const Total = (props) => {


    const total = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>
            Total number of exercises: {total}
        </p>
    )
}
    



export default Total