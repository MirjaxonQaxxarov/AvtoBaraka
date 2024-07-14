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
  const [heddened,setHeddened]=useState(false)
  const [btnTxt,setBtnTxt]=useState("Hide Content")
 
  const handleClick = ()=>{
    setName("Mirjaxon")
  }
  const handleDelete = (id)=>{
    setEvents((prev)=>{
      return prev.filter((e)=>{
        return e.id !== id
      })
    })
  }
  const handleHide = ()=>{
    if (heddened) {
      setBtnTxt("Hide Content")
      setHeddened(false)
    }else{
      setBtnTxt("Show Content")
      setHeddened(true)
      
    }
  }
  return (
    <div className="App">
      <h1>{name}</h1>
      <hr/>
      <br/>
      <button onClick={handleHide} >{btnTxt}</button>

      <button onClick={handleClick}>click me</button>
      <div className={heddened?"hide":"show"}>
        {events.map((event)=>{
          return(
            <div key={event.id}>
              <h2>{event.title}</h2>
              <button onClick={()=>handleDelete(event.id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
