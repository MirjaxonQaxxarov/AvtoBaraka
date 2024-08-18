import {Navigate} from "react-router-dom";
import userStore from "../store/userStore.js";

export function Logout() {
    localStorage.clear()
    const changeUser = userStore((state)=>state.changeUser);
    changeUser({})

    return (
        <>
            <Navigate to={'/login'}/>
        </>
    )
}