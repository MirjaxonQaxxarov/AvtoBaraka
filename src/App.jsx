import Mobile from "./layout/Mobile.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login.jsx";
import {Logout} from "./login/Logout.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='*' element={<Mobile/>}/>
            </Routes>
        </>
    )
}
export default App
