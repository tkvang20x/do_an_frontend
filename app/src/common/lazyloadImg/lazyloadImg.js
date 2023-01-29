import React from "react";
import LazyLoad from 'react-lazyload';
import Logo from "./mb_large.png";
import "./lazyloadImg.scss";
import ImageLoad from "./ImageLoad";

export const PlaceHolder = () => {
    return (
        <div className="d-flex justify-content-center view-plahoder">
            <div className="text-center">
                <img src={Logo} width={"400px"} height={"400px"} alt="" />
                <h3>Image Loading ...</h3>
            </div>
        </div>
    )
}

export const PlaceHolderSmall = () => {
    return (
            <div className = "image-load">
                <img src={Logo} className = "img-item" alt="" />
                <p>Image Loading ...</p>
            </div>
    )
}

function LazyLoadImg({ attachmentId, size, height, typeImage }) {
    return (
        <LazyLoad key={attachmentId} classNamePrefix={ typeImage === "ORIGINAL" ? `row` : null} offset={[2000, 0]}
            placeholder={typeImage === "ORIGINAL" ? <PlaceHolder /> : <PlaceHolderSmall /> } debounce={800} overflow>
            <ImageLoad key={attachmentId} attachmentId={attachmentId} size={size} height={height} typeImage = {typeImage} />
        </LazyLoad>
    )
}

export default LazyLoadImg;