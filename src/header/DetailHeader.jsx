import css from './Header.module.css';
import {Icon} from "@iconify-icon/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export default function DetailHeader({title,img}) {
    const navigate = useNavigate();
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        if (navigator.share && !isSharing) {
            setIsSharing(true); // Ulashish jarayonini boshlash
            try {
                await navigator.share({
                    title: 'Auto-Baraka.Uz',
                    text: title,
                    url: img,
                });
            } finally {
                setIsSharing(false); // Ulashish tugadi
            }
        }
    };

    return (
        <div className={`${css.header2} `} >
            <>
                <div  style={{alignItems:'center', display:'flex'}}>
                    <Icon onClick={()=>navigate(-1)} style={{marginRight:'2rem',fontSize:'2rem'}} icon="mingcute:arrow-left-line" />
                    <div>{title}</div>
                </div>
                <Icon onClick={handleShare} style={{borderRadius:'50%',backgroundColor:'var(--btn-bg)',padding:'1rem',fontSize:'1rem'}} icon="material-symbols:share-outline" />
            </>
        </div>
    )
}