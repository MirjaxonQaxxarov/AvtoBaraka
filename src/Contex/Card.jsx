import css from './content.module.css'
import {
    CalendarOutlined,
    DashboardOutlined, EyeOutlined,
    MergeOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";
import {DEFAUT_IMG_URL} from "../store/consts.js";
import {t} from "i18next";
import {Icon} from "@iconify-icon/react";
import {useReqWT} from "../http/req.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, notification, Popconfirm} from "antd";
import Modal from "./Modal.jsx";

// eslint-disable-next-line react/prop-types
export default function Card({controls = false, data = {}}) {
    const [datax, setData] = useState(data);
    const navigate = useNavigate();
    let imgUrl = DEFAUT_IMG_URL + JSON.parse(data.carImage)[0];

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleOk = (e) => {
        e.stopPropagation();
        setConfirmLoading(true);
        reqWT('get', '/deletelisting/'+datax.id, {}).then((response) => {
            if (parseInt(response) === 1) {
                notification.info({
                    message: t("success"),
                    // description: response.message,
                    placement: "topRight"
                });
                openModal()
            }
            else{
                notification.error({
                    message: t("error"),
                    description: "",
                    placement: "topRight"
                });
            }

        })
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const [showModal, setShowModal] = useState(false);
    const openModal = (e) => {
        e.stopPropagation();
        setShowModal(!showModal);
    }
    const {reqWT} = useReqWT();
    const viewDetails = (e) => {
        e.stopPropagation();
        localStorage.setItem('viewDetailsData', JSON.stringify(datax));
        navigate('/view-details/' + datax.id);
    };
    const liked = (e) => {
        e.stopPropagation();
        reqWT('post', '/liked', {
            listing_id: datax.id
        }).then((res) => {
            setData({...datax, liked: res})
        })
    }

    const kridet = (e) => {
        e.stopPropagation();
        navigate('/kridet/' + data.price + '/' + data.valyuta_short);
    }
    console.log(datax)

    return (
        <div onClick={viewDetails} className={css.card}>
            <div className={css.cardImg} style={{backgroundImage: `url('${imgUrl}')`}}>
                <div className={css.cardImgItem}>
                    <b style={{visibility: datax.topStatus ? '' : 'hidden'}} className={css.top}>TOP</b>
                    <div className={css.like} onClick={liked}>{datax.liked == 0 ?
                        <Icon icon="mdi:heart-outline" style={{
                            marginTop: '0.5rem',
                            fontSize: '30px',
                            color: 'red'
                        }}/> : <Icon icon="mdi:heart" style={{
                            marginTop: '0.5rem',
                            fontSize: '30px',
                            color: 'red'
                        }}/>}</div>
                </div>
                <div className={css.cardPrice}>
                    <div></div>
                    <div style={{alignContent: 'end'}}>
                        <div className={css.cardPriceItem}>
                            <EyeOutlined style={{color: 'red'}}/>
                            <div>{datax.viewed}</div>
                            <b style={{color: 'var(--btn-bg)'}}>{datax.price.toLocaleString()} {datax.valyuta_short}</b>
                        </div>
                    </div>

                </div>

            </div>
            <p style={{color: 'var(--btn-bg)'}}>{datax.brand} {datax.model}</p>
            <p>{datax.region} {datax.district}</p>
            <div className={css.cardIcon}>
                <div className={css.iconDiv}>
                    <CalendarOutlined className={css.icon}/>
                    <p>{datax.year}-{t('yil')}</p>
                </div>
                <div className={css.iconDiv}>
                    <MergeOutlined className={css.icon}/>
                    <p>{datax.transmission}</p>
                </div>
                <div className={css.iconDiv}>
                    <ThunderboltOutlined className={css.icon}/>
                    <p>{datax.type_of_fuel}</p>
                </div>
                <div className={css.iconDiv}>
                    <DashboardOutlined className={css.icon}/>
                    <p>{datax.mileage} KM</p>
                </div>
            </div>
            {!controls && <p onClick={kridet} style={{marginTop: 30}}>{t('Kriditga hisoblash')}</p>}
            {controls && <p className={css.controls} style={{marginTop: 30}}>
                <Button onClick={openModal} type="primary" style={{backgroundColor: 'var(--btn-bg)'}}>
                    {t("Narxni o'zgartirish")}
                </Button>
                <Button type="primary" style={{backgroundColor: 'var(--btn-bg)'}}>
                    {t("Topga chiqarish")}
                </Button>

                <Popconfirm
                    title={t('Diqqat')}
                    description={t("E'lon o'chirilgandan kiyin ma'lumotlarni tiklab bo'lmaydi")}
                    open={open}
                    colorWarning="green"
                    colorText="green"
                    onConfirm={handleOk}
                    okButtonProps={{loading: confirmLoading}}
                    onCancel={handleCancel}
                >
                    <Button  onClick={showPopconfirm}  type="primary" danger>
                        {t("O'chirish")}
                    </Button>
                </Popconfirm>
            </p>}
            {showModal && <Modal id={datax.id} openModal={()=>{setShowModal(!showModal)}}/>}
        </div>

    )
}