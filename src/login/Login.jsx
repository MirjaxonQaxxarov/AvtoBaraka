
import css from './Login.module.css'
import {useState} from "react";
import axios from "axios";
import {DEFAUT_URL} from "../store/consts.js";
import {notification} from 'antd';
import userStore from "../store/userStore.js";
import {Navigate, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function Login() {
    const { t,i18n }  = useTranslation();
    let lang = i18n.language;
    let navigate = useNavigate();
    let changeUserData = userStore((state) => state.changeUser);
    let userData = userStore((state) => state.user);
    let [codeStatus, setcodeStatus] = useState(false);
    let [phone, setPhone] = useState(0);

    if (userData.access_token) {
        return <Navigate to='/'/>
    }

    const getCode = (e) => {
        e.preventDefault();
        let phone = document.querySelector('#phoneField');
        let label = document.querySelector('#phoneLabel');
        if (phone.value.length === 12) {

            axios.post(DEFAUT_URL + "/get-code", {
                phone: phone.value,
                code: 'https://mcoder.uz'
            }).then((data) => {
                if (data.status === 200) {
                    notification.success({
                        message: t('success'),
                        description: data.data.message,
                        placement: 'topRight'
                    });
                    setcodeStatus(true)
                    phone.disabled = true;
                    label.textContent = t('telefon')
                    setPhone(phone.value)
                    e.target.disabled=true
                } else {
                    notification.error({
                        message: t('error'),
                        description: data.data.message,
                        placement: 'topRight'
                    });
                }
            }).catch((error) => {
                notification.error({
                    message: t('error'),
                    description: error.message,
                    placement: 'topRight'
                })
            })
        } else {
            label.textContent = t('errorPhone')
            phone.style.border = '1px solid red'
            phone.focus()
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        let code = document.querySelector('#codeField');
        let label = document.querySelector('#codeLabel');
        if (code.value.length === 6) {
            axios.post(DEFAUT_URL + "/login", {
                phone: phone,
                code: code.value
            }).then((data) => {
                if (data.status === 200) {
                    notification.success({
                        message: t('success'),
                        description: data.data.message,
                        placement: 'topRight'
                    });
                    changeUserData(data.data)
                    navigate("/");
                } else {
                    notification.error({
                        message: t('error'),
                        description: data.data.message,
                        placement: 'topRight'
                    });
                }
            }).catch((error) => {
                notification.error({
                    message: t('error'),
                    description: error.message,
                    placement: 'topRight'
                })
            })
        } else {
            label.textContent = t('errorCode')
            label.style.border = '1px solid red'
            code.focus()
        }
    }
    return (
        <>
            <div className={css.login}>
                <div className={css.lang}>
                <span className={lang === 'uz' ? css.langActive : ''} onClick={() => {
                    if (lang !== 'uz') {
                        i18n.changeLanguage('uz')
                        localStorage.setItem('language','uz')
                    }
                }}>UZ</span>
                    <span className={lang === 'ru' ? css.langActive : ''} onClick={() => {
                        if (lang !== 'ru') {
                            i18n.changeLanguage('ru')
                            localStorage.setItem('language','ru')
                        }
                    }}>RU</span>
                </div>
            </div>
            <form className={css.form}>
                <div>
                    <label id={'phoneLabel'}>{t('telefon')}</label>
                    <div className={css.inputDiv}>
                        <input required minLength={11} maxLength={12} id={'phoneField'} placeholder={'998901234567'}
                               type="number"/>
                        <button type={"submit"} onClick={getCode}>{t('getCode')}</button>
                    </div>
                </div>
                {
                    codeStatus && <>

                        <div>
                            <label id={'codeLabel'}>{t('code')}</label>
                            <div className={css.inputDiv}>
                                <input required minLength={6} maxLength={6} id={'codeField'} placeholder={'000000'}
                                       type="text"/>
                            </div>
                        </div>
                        <div>
                            <button type="submit" onClick={submitForm} className={css.btn}>{t('submit')}</button>
                        </div>
                    </>

                }


            </form>
        </>
    );

}



