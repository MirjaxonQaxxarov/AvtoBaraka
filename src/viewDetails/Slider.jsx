import './Slider.css';
import {DEFAUT_IMG_URL} from "../store/consts.js";
import {Icon} from "@iconify-icon/react"; // Tooltip uchun CSS ni qo'shishni unutmang

// eslint-disable-next-line react/prop-types
const Slider = ({min_price, price, price_foiz, model_img, valyuta_short, max_price}) => {

    return (
        <div className="slider-container">
            <div className="price">
                {min_price}
            </div>
            <div style={containerStyle}>
                <div className="tooltip-container">
                    <div
                        style={{
                            ...sliderStyle,
                            background: `linear-gradient(90deg, green 60%, red 100%)`
                        }}
                    ></div>
                    <div className="tooltip" style={{left: 100 - parseInt(price_foiz) + '%'}}>
                        <img src={DEFAUT_IMG_URL + model_img} alt="Tooltip Image"/>
                        <span className="tooltiptext">{price.toLocaleString()} {valyuta_short}</span>
                        <Icon style={{fontSize: "2rem"}} icon="icon-park-solid:down-one"/>
                    </div>
                </div>
            </div>
            <div className="price">
                {max_price}
            </div>
        </div>
    );
};

const containerStyle = {
    width: '85vw',
    textAlign: 'center'
};

const sliderStyle = {
    width: '100%',
    height: '8px',
    borderRadius: '5px',
    appearance: 'none', /* Tugmani olib tashlaydi */
    outline: 'none',
    marginBottom: '20px',
};

export default Slider;
