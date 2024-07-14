// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  // let name = "Mcoder"
  const [name,setName] = useState("MCoder")
  const [events, setEvents] = useState([
    {title: "akhror's birthday party", id: 1},
    {title: "doniyor's live stream", id: 2},
    {title: "match: manchester united vs barcelona", id: 3}
  ])
 
  const handleClick = ()=>{
    setName("Mirjaxon")
  }

  return (
    <div className="App">
      <h1>{name}</h1>
      <button onClick={handleClick}>click me</button>
      {events.map((event)=>{
        return(
          <div key={event.id}>
            <h2>{event.title}</h2>
          </div>
        )
      })}
    </div>
  );
}

export default App;
