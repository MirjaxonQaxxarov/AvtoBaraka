import ReactDOM from "react-dom";
import css from "../footer/Footer2.module.css";
import {t} from "i18next";
import {useReqWT} from "../http/req.js";
import {notification} from "antd";

export default function Modal({id,openModal}) {
    const {reqWT} = useReqWT();
    const saveData = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // your code here to save data
        const price = e.target[0].value
        reqWT('POST', '/change-price/'+id, {
            price: price
        }).then((response) => {
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
    }
    return ReactDOM.createPortal((
        <div className={css.modal} onClick={(e)=>{e.stopPropagation(); openModal();  }}>
            <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={saveData}>
                    <label>
                        <span style={{marginLeft:"5rem"}}>{t("Yangi narxni kiriting")}</span>
                        <input required type={'number'}/>
                    </label>
                    <button style={{width: "87vw !important", marginTop: "30px"}}>{t("Yuborish")}</button>
                </form>
            </div>
        </div>
    ), document.body)
}