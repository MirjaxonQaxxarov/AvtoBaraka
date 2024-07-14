import {useEffect, useState} from "react";

export function Request() {
    const [fdata, setFData] = useState([]);
    // console.clear()
    console.log(fdata)
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then((data) => {
            console.log(data)
            setFData(data);
        })
    },[])

    return (
        <>
            {fdata.map((user) => {
                                   return <div key={user.id} className="card">
                                        <img src="https://img.freepik.com/free-photo/silhouette-person-standing-top-hill-beautiful-colorful-sky-morning_181624-24501.jpg?w=1380&t=st=1720960505~exp=1720961105~hmac=5b913b6d6c66b72bd131604df389c8efc81bf4dc2abcdecc2c1d9c0fff8fa61f" alt={user.name}/>
                                        <div className={"item"}><b>First name:</b><i>{user.name}</i></div>
                                        <div className={"item"}><b>Last name:</b><i>{user.username}</i></div>
                                        <div className={"item"}><b>Age:</b><i>{user.email} let</i></div>
                                        <div className={"item"}><b>Gender:</b><i>{user.phone}</i></div>
                                </div>
                        })
            }
        </>
    )
}