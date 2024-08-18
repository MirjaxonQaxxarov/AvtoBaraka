import css from './Header.module.css'
import {CustomerServiceOutlined, SearchOutlined, SettingOutlined} from "@ant-design/icons";
import {useHref, useNavigate} from "react-router-dom";
import {t} from "i18next";

export default function Header() {
    let menu = useHref();
    const navigate = useNavigate();
    return (
        <div className={`${css.header}  ${menu === "/" ? css.headerColor : ""}`}>
            {
                menu === "/" && <>
                    <div>{t("AVTO BARAKA")}</div>
                    <SearchOutlined/>
                </>
            }
            {
                menu === "/liked" &&
                <div>{t("Tanlanganlar")}</div>
            }
            {
                menu === "/addlisting" &&
                <div>{t("E'lon joylash")}</div>
            }
            {
                menu === "/message" &&
                <div>{t("Suxbatlar")}</div>
            }
            {
                menu === "/cabinet" && <>
                    <div>{t("KABINET")}</div>
                    <div className={css.headerColor}>
                        <CustomerServiceOutlined onClick={()=>{navigate('/message/userid/0/0')}} style={{paddingRight: '2rem'}}/> <SettingOutlined/>
                    </div>
                </>
            }


        </div>
    )
}