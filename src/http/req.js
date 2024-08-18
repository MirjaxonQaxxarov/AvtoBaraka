import axios from "axios";
import { DEFAUT_URL } from "../store/consts.js";
import userStore from "../store/userStore.js";
import {useNavigate} from "react-router-dom";

export function useReqWT() {
    const userData = userStore((state) => state.user);
    const nav = useNavigate()

    const reqWT = (method, url, data) => {
        if (method.toLowerCase() === 'post') {
            return axios.post(DEFAUT_URL + url, data, {
                headers: {
                    'Authorization': userData.access_token
                }
            }).then((data)=>{
                if (data.status ===401) {
                    nav('/logout');
                    return null;
                }
                return data.data;
            });
        } else if (method.toLowerCase() === 'get') {
            return axios.get(DEFAUT_URL + url, {
                headers: {
                    'Authorization': userData.access_token,
                }
            }).then((data)=>{
                if (data.status ===401) {
                    nav('/logout');
                    return null;
                }
                return data.data;
            });
        }
    };

    return { reqWT };
}
