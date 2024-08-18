import {useNavigate, useParams} from "react-router-dom";
import {Icon} from "@iconify-icon/react";
import css from "./Message.module.css";
import {t} from "i18next";
import {useEffect, useRef, useState} from "react";
import {useReqWT} from "../http/req.js";
import userStore from "../store/userStore.js";
import {DEFAUT_IMG_URL} from "../store/consts.js";
import {notification} from "antd";

export default function OneMessage() {
    const {type,id,friendid} = useParams();
    const {reqWT} = useReqWT();
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [textarea,setTextarea] = useState('');
    const  mydata = userStore((state)=>state.user);
    const lastMessageRef = useRef(null);
    const txtRef = useRef(null);




    function getMessages() {
        if (type === "userid") {
                reqWT('post', '/all-messages-two', {user_id: id}).then((res) => {
                    setData(res)
                })

        } else {
                reqWT('post', '/all-messages', {room_id: id}).then((res) => {
                    setData(res)
                })
        }
    }
    useEffect(()=>{
        getMessages()
    },[])
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }
    }, [data]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (textarea.trim() === '') {
            return;
        }
        reqWT('post', '/send-message', {
            user_id: friendid,
            message: textarea,
        }).then(() => {
            notification.info({
                message: t('success'),
                description: t("success message"),
                placement: 'topRight'
            })
            getMessages()
            txtRef.current.value =""
        })
    }

    return (
        <>
            <div className={css.header2} >
                <div style={{alignItems: 'center', display: 'flex'}}>
                    <Icon onClick={() => navigate(-1)} style={{marginRight: '2rem', fontSize: '2rem'}}
                          icon="mingcute:arrow-left-line"/>
                    <div></div>
                </div>
            </div>
            <div className={css.Mbody}>
                {
                    data.map((e,i)=>{
                        const img = JSON.parse(e.file)

                        if(parseInt(e.sender_id) === parseInt(mydata.user_id)) {
                            return (
                                <div key={i} className={css.myMessage}>
                                    {
                                        img.length > 0?
                                        <img src={DEFAUT_IMG_URL + img[0]} alt={e.message}/>:
                                        <b>{e.message}</b>
                                    }
                                    <span>{e.date}</span>
                                </div>
                            )
                        }
                        else{
                            return (
                                <div key={i} className={css.senderMessage}>
                                    <b>{e.message}</b>
                                    <span>{e.date}</span>
                                </div>
                            )
                        }
                    })
                }
                <div className={css.last}  ref={lastMessageRef}>&nbsp;</div>
            </div>
            <div className={css.footer2}>
                    <Icon icon="ci:paperclip-attechment-horizontal"  style={{color: 'white'}} />
                    <textarea onChange={(e)=>{setTextarea(e.target.value)}} ref={txtRef} placeholder={t("Xabarni kiriting")}/>
                    <Icon onClick={sendMessage} icon="ic:round-send"  style={{color: "white"}} />
            </div>


        </>
    )

}