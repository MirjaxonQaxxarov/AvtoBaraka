import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import './cabinet.css'

import { Tabs } from 'antd';
import {t} from "i18next";
import MyTab from "./MyTab.jsx";




export default function Cabinet() {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: t("Tasdiqlanganlar"),
            children: <MyTab id_key={1}/>,
        },
        {
            key: '2',
            label: t("Faol emas"),
            children: <MyTab id_key={2}/>,
        },
        {
            key: '3',
            label: t("Blok qilingan"),
            children: <MyTab id_key={3}/>,
        },
    ];
    return (
        <>
            <Header/>
            <div >
                <Tabs
                    style={{ height: 220 }}
                    size={"large"}
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                />
            </div>
            <Footer/>
        </>
    )
}