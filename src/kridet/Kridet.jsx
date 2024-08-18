import css from "./Kridet.module.css";
import {Icon} from "@iconify-icon/react";
import {t} from "i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useReqWT} from "../http/req.js";
import {useEffect, useState} from "react";

export default function Kridet() {
    const navigate = useNavigate();
    const {reqWT} = useReqWT();
    const {price, valyuta} = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        reqWT('get', `/kridet/${valyuta}/1/${price}`, {}).then((response) => {
            setData(response);
        })
    }, [])
    return (
        <>
            <div className={css.header2}>
                <div style={{alignItems: 'center', display: 'flex'}}>
                    <Icon onClick={() => navigate(-1)} style={{marginRight: '2rem', fontSize: '2rem'}}
                          icon="mingcute:arrow-left-line"/>
                    <div>{t("KRIDETGA HISOBLASH")}</div>
                </div>
            </div>
            <div className={css.mainInfo}>
                {data.map((e,i) => {
                    return (
                        <table key={i}>
                            <tbody>
                            <tr>
                                <td>{t('Kridet muddati')}</td>
                                <td>{e.yil}</td>
                            </tr>
                            <tr>
                                <td>{t('Oylar soni')}</td>
                                <td>{e.data.oylarSoni}</td>
                            </tr>
                            <tr>
                                <td>{t("Oylik to'lov")}</td>
                                <td>{e.data.oylikTulov.toLocaleString()} uzs</td>
                            </tr>
                            <tr>
                                <td>{t("Birinchi to'lov usd", {val: "uzs"})}</td>
                                <td>{e.data.summaTulov.toLocaleString()} uzs</td>
                            </tr>
                            <tr>
                                <td>{t("Birinchi to'lov usd", {val: "usd"})}</td>
                                <td>{e.data.summaTulovUsd.toLocaleString()} usd</td>
                            </tr>

                            </tbody>
                        </table>
                    )
                })}
            </div>
        </>
    )
}