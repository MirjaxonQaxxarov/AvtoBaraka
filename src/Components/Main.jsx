import {Modal} from "./Modal.jsx";
import {useState} from "react";

export function Main({users,count,appendUser}) {
const [showModal, setShowModal] = useState(false);
const  openModal = ()=>{
    setShowModal(!showModal);
}
    return (

        <div className="Main">
            {showModal &&<Modal openModal={openModal} appendUser={appendUser}/>}
            <button className="createBTN" onClick={openModal}>Create User</button>
            {count>0 &&
                <div className="container">
                    {
                        users.map((user)=> {
                                return(
                                    <div className="card">
                                        <img src={user.imgURL} alt={user.firstName}/>
                                        <div className={"item"}><b>First name:</b><i>{user.firstName}</i></div>
                                        <div className={"item"}><b>Last name:</b><i>{user.lastName}</i></div>
                                        <div className={"item"}><b>Age:</b><i>{user.age} let</i></div>
                                        <div className={"item"}><b>Gender:</b><i>{user.gender}</i></div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            }
            {!count>0 &&
                <div className="bgnouser">
                    No User
                </div>
            }
        </div>

    )
}