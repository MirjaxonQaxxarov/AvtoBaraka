import css from './ViewDetails.module.css'
import {useState} from "react";
import {DEFAUT_IMG_URL} from "../store/consts.js";
import {Carousel} from "antd";
import DetailHeader from "../header/DetailHeader.jsx";
import {Icon} from "@iconify-icon/react";
import {t} from "i18next";
import {EyeOutlined} from "@ant-design/icons";
import Table from "./Table.jsx";
import {Link} from "react-router-dom";
import Slider from "./Slider.jsx";
import MyMap from "./MyMap.jsx";
import DetailFooter from "../footer/DetailFooter.jsx";


export default function ViewDetails() {
    const [data] = useState(JSON.parse(localStorage.getItem('viewDetailsData')));


    return (
        <>
            <DetailHeader title={data.brand + ' ' + data.model} img={DEFAUT_IMG_URL + JSON.parse(data.carImage)[0]}/>
            <div className={css.container}>
                <div className={css.carusel}>
                    <Carousel style={{zIndex: '10'}}>
                        {
                            JSON.parse(data.carImage).map((e, i) => {
                                return <img key={i} src={`${DEFAUT_IMG_URL}${e}`} alt="Car Image"/>

                            })
                        }
                    </Carousel>
                    <div className={css.cardPriceItem}>
                        <EyeOutlined style={{color: 'red'}}/>
                        <div>{data.viewed}</div>
                        <b style={{color: 'var(--btn-bg)'}}>{data.price.toLocaleString()} {data.valyuta_short}</b>
                    </div>
                </div>
                <div className={css.mainInfo}>
                    <div className={css.header}>
                        <div>
                            <p>{data.district} {data.region}</p>
                            <br/>
                            <p>{t('Parametrlar')}</p>
                        </div>
                        <Link target={'_blank'}
                              to={`https://www.google.com/maps/dir//${data.lat},${data.long}/@${data.lat},${data.long},14z?entry=ttu`}>
                            <Icon style={{
                                borderRadius: '50%',
                                backgroundColor: 'red',
                                color: '#fff',
                                padding: '1rem',
                                fontSize: '2rem',
                                width: '2rem',
                                height: '2rem'
                            }} icon="mdi:location"/>
                        </Link>
                    </div>
                    <div className={css.body}>
                        <Table data={data}/>
                        <br/>
                        <p>{t('boshqa narx', {car: data.model})}</p>
                        <br/>
                        <Slider {...data} />
                        <p>
                            {t("Qisqacha ma'lumot")}
                        </p>
                        <p>{data.description}</p>
                        <br/>
                        <p>{t("Xaritadagi joylashuvi")}</p>
                        <div className={css.map}>
                            <MyMap lat={data.lat} long={data.long}/>
                        </div>
                    </div>
                </div>
            </div>

            <DetailFooter {...data}/>
        </>
    )
}