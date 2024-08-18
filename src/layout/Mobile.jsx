import Home from "../home/Home.jsx";
import Cabinet from "../cabinet/Cabinet.jsx";
import Message from "../message/Message.jsx";
import Liked from "../liked/Liked.jsx";
import AddListing from "../addListing/AddListing.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import userStore from "../store/userStore.js";
import {useEffect} from "react";
import ViewDetails from "../viewDetails/ViewDetails.jsx";
import Kridet from "../kridet/Kridet.jsx";
import OneMessage from "../message/OneMessage.jsx";


export default function Mobile() {
    let userData = userStore((state) => state.user);
    useEffect(()=>{

    })
    if (!userData.access_token) {
        return <Navigate to='/login'/>
    }
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/cabinet' element={<Cabinet/>}/>
                <Route path='/message' element={<Message/>}/>
                <Route path='/message/:type/:id/:friendid' element={<OneMessage/>}/>
                <Route path='/liked' element={<Liked/>}/>
                <Route path='/addlisting' element={<AddListing/>}/>
                <Route path='/view-details/:id' element={<ViewDetails/>} />
                <Route path='/kridet/:price/:valyuta' element={<Kridet/>} />
                <Route path='*' element={<Home/>}/>
            </Routes>
        </>
    )
}