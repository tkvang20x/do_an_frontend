import React from "react";
import ConstAPI from "../../common/const";
import './ImageView.scss';

const ImageView = ({src}) => {


    return(
        <div className="do-an-image-container">
            <img className="do-an-image-container__image"  src={`${ConstAPI.BASE_HOST_API}${src}`}></img>
        </div>
    )

}

export default ImageView;