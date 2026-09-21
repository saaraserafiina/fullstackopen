const Header = (props) => {
  
  console.log(props.course.parts[0].name)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )

}

export default Header