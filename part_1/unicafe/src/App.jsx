import { useState } from 'react'

const Button = (props) => {

  return (
  <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const Statistics = (props) => {

  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (

    <table>
      <tbody>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={props.all} />
      <StatisticsLine text="average" value = {props.average} />
      <StatisticsLine text="positive" value={props.positives} />
      </tbody>
    </table>
  )

}

const StatisticsLine = (props) => {

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {


  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(null)

  // lasketaan tilastot
  const all = good + neutral + bad
  const average = ((good * 1 + neutral * 0 + bad * (-1)) / all).toFixed(2)
  const positives = ((good / all) * 100).toFixed(2) + " %"
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good +1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>feedback statistics</h1>
    
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positives={positives}/>
      
    </div>
  )
}

export default App