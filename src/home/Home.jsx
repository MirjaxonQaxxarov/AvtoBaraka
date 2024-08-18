import TopSlider from "./TopSlider.jsx";
import Content from "../Contex/Content.jsx";
import css from "./home.module.css"
import {useReqWT} from "../http/req.js";
import {useEffect, useState} from "react";
import i18n from "i18next";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

export default function Home() {
    const {reqWT}= useReqWT();
    const [data, setData] = useState({});
    const [cardData, setCardData] = useState([]);
    const lang = i18n.language;
    useEffect(()=>{
        reqWT('POST','/get-listing/'+lang,{}).then(res=>{
            setData(res);
            setCardData(res.data); // limit 6 items to show in the card section.
        });
    },[lang]);
    return (
        <>
            <Header/>
               <div className={css.home}>
                    <TopSlider setData={setData} setCardData={setCardData} />
                    <Content data={data} setData={setData}  cardData={cardData} setCardData={setCardData}  height='42' />
               </div>
            <Footer/>
        </>
    )
}