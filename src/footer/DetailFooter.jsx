import css from './Footer2.module.css';
import {Icon} from "@iconify-icon/react";
import {t} from "i18next";
import {useReqWT} from "../http/req.js";
import {useState} from "react";
import Modal from "./Modal.jsx";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function DetailFooter({id,liked,phone,user_id}) {
    const {reqWT} = useReqWT();
    const navigate = useNavigate();
    const [like, setLike] = useState(parseInt(liked));
    const [showModal, setShowModal] = useState(false);
    const  openModal = ()=>{
        setShowModal(!showModal);
    }

    const handleLiked = (e)=>{
        e.stopPropagation();
        reqWT('post','/liked',{
            listing_id:id
        }).then((res)=>{
            setLike(parseInt(res))
        })
    }

     return (
         <>
        <footer className={css.footer}>
            <span onClick={openModal} ><Icon style={{color:'white'}} icon="bxs:error" /></span>
            <span onClick={handleLiked}  ><Icon  icon="fa6-solid:heart-circle-check"  style={{color: parseInt(like)===0?'white':'red'}} /></span>
            <span onClick={()=>navigate(`/message/userid/${user_id}/${user_id}`)} ><Icon icon="ic:outline-message"  style={{color: 'white'}} /></span>
            <span  onClick={() => { window.location.href = `tel:${phone}`; }} ><Icon icon="ic:outline-phone"  style={{color: 'white'}} /><div  style={{color: 'white'}}> {t("Sotuvchiga qo'ng'iroq qilish")}</div></span>
        </footer>

             {showModal &&<Modal id={id} openModal={openModal}/>}
         </>
    );
}