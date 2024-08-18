import ReactDOM from "react-dom";
import css from "./Footer2.module.css"
import {t} from "i18next";
import {useReqWT} from "../http/req.js";
import {notification} from "antd";

export default function Modal({id,openModal}) {
    const {reqWT} = useReqWT();
    const saveData = (e) => {
        e.preventDefault();
        // your code here to save data
        const message = e.target[0].value
        reqWT('POST', '/report', {
            listing_id: `${id}`,
            description:message
        }).then((response) => {
            if (response.status === "success") {
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
        <div className={css.modal} onClick={openModal}>
            <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={saveData}>
                    <label>
                        <span>{t("Shikoyatingizni kiriting")}</span>
                        <textarea required/>
                    </label>
                    <button style={{width: "100%", marginTop: "30px"}}>{t("Yuborish")}</button>
                </form>
            </div>
        </div>
    ), document.body)
}