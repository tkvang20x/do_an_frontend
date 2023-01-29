import React, { useCallback, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTriangleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import './Toasts.scss'

const Toasts = ({toastList, setList}) => {
    const deleteToast = useCallback(id => {
        const toastListItem = toastList.filter(e => e.id !== id)
        setList(toastListItem)
    }, [])

    const dataToast = {
        success: {
            icon: <FontAwesomeIcon icon={faCircleCheck} />,
            background: "#1fb266",
        },
        warning: {
            icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
            background: "#f1b627",
        },
        info: {
            icon: <FontAwesomeIcon icon={faCircleInfo} />,
            background: "#141ed2",
        },
        error: {
            icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
            background: "#eb2d4b",
        },
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(toastList.length){
                deleteToast(toastList[0].id)
            }
        }, 4000)

        return () => {
            clearInterval(interval)
        }
    }, [toastList, deleteToast])

    return (
        <div className='toasts-container bottom-right'>
            {
                toastList.map((toast, i) => {
                    return(
                        <div
                            key={toast.id}
                            className='notification toast bottom-right'
                        >
                            <div 
                                className='logo'
                                style={{color: dataToast[toast.type].background}}
                            >{dataToast[toast.type].icon}</div>
                            <div className='info'>
                                <div className='title'>{toast.title}</div>
                                <div className='message'> {toast.message}</div>
                            </div>
                            <div className='button'><button onClick={() => deleteToast(toast.id)}><i className="fa-solid fa-xmark"></i></button></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Toasts