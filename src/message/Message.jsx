import Header from "../header/Header.jsx";
import css from "./Message.module.css"
import Footer from "../footer/Footer.jsx";
import {Icon} from "@iconify-icon/react";
import {useReqWT} from "../http/req.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Message() {

    const {reqWT}= useReqWT();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        reqWT('get','/all-rooms',{}).then(res=>{
            setData(res);
        });
    },[]);

    return (
        <>
            <Header/>
            <div className={css.body}>
                {
                    data.map((item, index) => (
                        <div onClick={()=>navigate(`/message/roomid/${item.room_id}/${item.id}`)} key={index} className={css.card}>
                            <Icon icon="ic:baseline-message"/>
                            <span>{item.phone}</span>
                            <p>{item.lastSmsTime}</p>
                        </div>
                    ))
                }
            </div>
            <Footer/>
        </>
    )
}