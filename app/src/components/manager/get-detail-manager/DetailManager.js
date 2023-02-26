import React, { useEffect, useState } from 'react';

import "./DetailManager.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo, faFileLines } from "@fortawesome/free-solid-svg-icons";
import ConstAPI from '../../../common/const';
import ManagerAction from '../../../redux/action/ManagerAction';
import { useDispatch, useSelector } from 'react-redux';

const DetailManager = ({ detailManager }) => {

    const dispatch = useDispatch()

    const managerDetail = useSelector(state => state.managerReducer.detailManager)

    useEffect(() => {
        ManagerAction.getDetailManagerAction(dispatch, detailManager)
    }, [detailManager])

    return (
        <div className='do-an__view-manager-container'>
            <div className='do-an__view-manager-container__info'>
                <div className='do-an__view-manager-container__info__group-info'>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Tên quản lý:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.name}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Mã người dùng:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.code}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Ngày sinh:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.date_of_birth}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Giới tính:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.gender}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Khóa:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.course}
                        </div>
                    </div>
                </div>

                <div className='do-an__view-manager-container__info__group-info'>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Tên đại học:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.university}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Số điện thoại:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.phone}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Email:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.email}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Tài khoản:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.user_name}
                        </div>
                    </div>
                    <div className='do-an__view-manager-container__info__row'>
                        <div className='do-an__view-manager-container__info__row__title'>
                            Ngày tạo:
                        </div>
                        <div className='do-an__view-manager-container__info__row__value'>
                            {managerDetail?.created_time}

                        </div>
                    </div>
                </div>
                <div className='do-an__view-manager-container__info__avatar'>
                    <img className="do-an-preview-image" src={`${ConstAPI.BASE_HOST_API}${managerDetail?.avatar}`}></img>
                </div>
            </div>
        </div>
    )

}

export default DetailManager;