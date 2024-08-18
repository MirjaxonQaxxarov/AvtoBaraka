import css from './home.module.css'
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import i18n,{t} from "i18next";
import {useReqWT} from "../http/req.js";
import {useEffect, useState} from "react";
import {DEFAUT_IMG_URL} from "../store/consts.js";
import {notification} from "antd";



export default function TopSlider({setData,setCardData}) {

    const [category,changeCategory] = useState([]);
    let lang = i18n.language;
    const { reqWT } = useReqWT();

    useEffect(() => {
        reqWT('GET', '/ltypes/' + lang, {})
            .then((data) => {
                    changeCategory(data);

            })
            .catch((e) => {
                notification.error({
                    message: 'Error',
                    description: e.message,
                    placement: 'topRight'
                })
            });
    }, [lang])

    const changeData = (id)=>{
        let fdata = {
            ltype_id:id,
        }
        reqWT('post','/get-listing/' + i18n.language,fdata).then((data) => {
            setData(data);
            setCardData(data.data)
            notification.info({
                message: 'Success',
                description: t("So'rovingiz bo'yicha 0ta e'lon topildi", {n : data.total}),
                placement: 'topRight'
            })
        })
    }

    return (
        <Swiper
            slidesPerView={2.8}
            spaceBetween={8}
            loop={category.length > 3} // Loop mode will only be enabled if there are enough slides
            pagination={{
                clickable: true,
            }}
            className={css.swiper}
        >

            {category.map((e) => (

                <SwiperSlide onClick={()=>changeData(e.id)} key={e.id}
                             style={{backgroundColor: 'var(--card-bg)', borderRadius: 14, textAlign: 'center'}}>
                    <img src={DEFAUT_IMG_URL+e.icon} alt=""/>
                    <br/>
                    <>{e.name}</>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}