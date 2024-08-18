import css from './Footer.module.css';
import './footer.css';
import {HeartOutlined, HomeOutlined, MessageOutlined, PlusCircleOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

export default function Footer() {
     return (
        <footer className={css.footer}>
            <NavLink to={'/'}  ><HomeOutlined /></NavLink>
            <NavLink to={'/liked'}  ><HeartOutlined /></NavLink>
            <NavLink to={'/addlisting'}  ><PlusCircleOutlined /></NavLink>
            <NavLink to={'/message'}  ><MessageOutlined /></NavLink>
            <NavLink to={'/cabinet'}  ><UserOutlined /></NavLink>
        </footer>
    );
}