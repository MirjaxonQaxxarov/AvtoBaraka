import  css from "./Tabs.module.css";
import i18n, {t} from "i18next";
import {useReqWT} from "../http/req.js";
import {useEffect, useState} from "react";
import Content from "../Contex/Content.jsx";

// eslint-disable-next-line react/prop-types
export default function MyTab({id_key}) {
    const {reqWT } = useReqWT();
    const lang = i18n.language;
    const [data, setData] = useState({});
    const [cardData, setCardData] = useState([]);
    const GetData = ()=>{
        let url = '/get-active/';
        if (parseInt(id_key)===2){
            url = '/get-deactive/';
        }
        else if (parseInt(id_key)===3){
            url = '/get-block/';
        }
          reqWT('post',url+lang,{}).then((res)=>{
              setData({
                  total:res.length,
              });
              setCardData(res); // limit 6 items to show in the card section.
          })
    };


    useEffect(()=>{
        GetData();
    },[lang]);

    return (
        <div className={css.tab}>
            {
                cardData.length>0 ?
                    <div style={{margin: "0 -1.5rem 0 -1rem"}}>
                        <Content controls={true} data={data}  setData={setData} setCardData={setCardData}  cardData={cardData}  height={43}/>
                    </div>
                    :
                    <div className={css.notFound}>
                        {t("E'lon mavjud emas")}
                    </div>
            }
        </div>
    )
}