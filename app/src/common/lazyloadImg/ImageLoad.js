import React, { useEffect, useState, Fragment } from "react";
import {PlaceHolder, PlaceHolderSmall} from "./lazyloadImg";
import { useSelector, useDispatch } from 'react-redux';

import { getOcrImage} from '../../redux/action/ocrAction';
import "./lazyloadImg.scss";


function ImageLoad({ attachmentId, size, height, typeImage }) {

    //connect redux
    const ocrReducer = useSelector((state) => state.ocrReducer);
    const dispatch = useDispatch();

    const [urlImage, setUrlImage] = useState('');

    useEffect(() => {
        const getUrl = (id) => {
            if (id) {
                const urlReducer = ocrReducer?.data?.find(x => x.processId === ocrReducer.processId && x.attachmentId === id);
                if (urlReducer && urlReducer.url) {
                    setUrlImage(urlReducer.url);
                    return;
                }
               getOcrImage(dispatch, { attachmentId: id, type: typeImage, token: ocrReducer.jwt }).then(result => {
                    if (result && result !== '') {
                        setUrlImage(result);
                        return;
                    }
                    setUrlImage('');
                });
            }
        }
        getUrl(attachmentId);
    }, [ocrReducer.processId, attachmentId]);

    const viewImage = () => {
        if (typeImage === "ORIGINAL") {
            return (
                <div className="form-group">
                    {urlImage !== '' ? <img src={urlImage}
                        width={size + '%'}
                        alt={""}
                        height={height}
                        id={attachmentId}
                    />
                        : <PlaceHolder /> 
                    }
                </div>
            )
        }

        return (
            <Fragment>
                {urlImage !== '' ? <img src={urlImage}
                    id={attachmentId} className = "img-item" alt=""
                />
                    :  <PlaceHolderSmall />
                }
            </Fragment>
        )
    }
    return (
        <Fragment>
            {viewImage()}
        </Fragment>
    )
}

export default ImageLoad;
