import Content from "../Contex/Content.jsx";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import {useReqWT} from "../http/req.js";
import {useEffect, useState} from "react";
import i18n from "i18next";

export default function Liked() {
    const {reqWT}= useReqWT();
    const [data, setData] = useState({});
    const [cardData, setCardData] = useState([]);
    const lang = i18n.language;
    useEffect(()=>{
        reqWT('get','/favourites/'+lang,{}).then(res=>{
            setData({
                total:res.length,
            });
            setCardData(res); // limit 6 items to show in the card section.
        });
    },[lang]);


    return (
        <>
            <Header/>
            <div>
                <Content data={data}  setData={setData} setCardData={setCardData}  cardData={cardData}  height={49}/>
            </div>
            <Footer/>
        </>
    )
}