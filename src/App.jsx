import './App.css'
import {useState} from 'react'
import Header from "./Components/Header.jsx";
import {Main} from "./Components/Main.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
    const [users, setUsers] = useState([]);
    const appendUser = (user) => {
        setUsers((prev) => {
            return [...prev, user];
        });
    }
    console.log(users)
    return (
        <>
            <Header count={users.length}/>
            <Main count={users.length} users={users} appendUser={appendUser}/>
            <Footer/>
        </>
    )
}

export default App
