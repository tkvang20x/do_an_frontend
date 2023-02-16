import React, { useEffect, useState } from 'react';

import "./DetailUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo, faFileLines } from "@fortawesome/free-solid-svg-icons";
import image from '../../../../share/image/123.jpg';
import UserAction from '../../../../redux/action/UserAction';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ConstAPI from '../../../../common/const';
import DataTable from '../../../../share/ecm-base/components/data-table/DataTable';
import Modal from '../../../../share/ecm-base/components/modal/Modal';
import Button from '../../../../share/ecm-base/components/button/Button';
import DropDown from '../../../../share/ecm-base/components/dropdown-v2/DropDown';
import VoucherAction from '../../../../redux/action/VoucherAction';

const DetailUser = ({ prefixPath }) => {

    const columnVoucher = [
        {
            title: "Mã thẻ mượn",
            dataIndex: "voucher_id",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Thời gian mượn",
            dataIndex: "start_date",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Hạn trả",
            dataIndex: "due_date",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Người duyệt",
            dataIndex: "created_by",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Số lượng",
            dataIndex: "books_borrowed",
            render: (text) => {
                return <span>{text.length}</span>
            },
            width: "20%"
        },
    ]

    const userDetail = useSelector(state => state.userReducer.detailUser)
    const listVoucher = useSelector(state => state.voucherReducer.listVoucher)

    useEffect(() => {
        UserAction.getDetailUserAction(dispatch, code)

        VoucherAction.getListVoucherAction(dispatch,
            {
                page: 1,
                size: 10,
                order_by: "created_time",
                order: -1,
                user_id: code
            }
        )
    }, [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { code } = useParams()

    console.log(listVoucher);

    return (
        <div className='do-an__view-user-container'>
            <div className='do-an__view-user-container__header'>
                <div className='do-an__view-user-container__header__text'>
                    <button
                        className="do-an__view-user-container__header__button"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} style={{ height: "22px", marginTop: "5px", marginLeft: "5px" }} />
                    </button>
                    <div className='do-an__view-user-container__header__title'>Thông tin chi tiết người dùng</div>
                </div>
            </div>
            <div className='do-an__view-user-container__info'>
                <div className='do-an__view-user-container__info__group-info'>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Tên người dùng:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.name}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Mã người dùng:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.code}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Ngày sinh:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.date_of_birth}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Giới tính:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.gender}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Khóa:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.course}
                        </div>
                    </div>
                </div>

                <div className='do-an__view-user-container__info__group-info'>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Tên đại học:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.university}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Số điện thoại:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.phone}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Email:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.email}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Tài khoản:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail.user_name}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Ngày tạo:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail?.created_time}

                        </div>
                    </div>
                </div>
                <div className='do-an__view-user-container__info__avatar'>
                    <img className="do-an-preview-image" src={`${ConstAPI.BASE_HOST_API}${userDetail.avatar}`}></img>
                </div>
            </div>
            <div className='do-an__view-user-container__table'>
                <div className='do-an__view-user-container__table__search'>
                    <div className="do-an__view-user-container__table__search__filter">
                        <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Tình trạng thẻ mượn:
                            </div>
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                <input className="do-an__view-user-container__table__search__item__input" />
                            </div>
                        </div>
                        <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Ngày bắt đầu:
                            </div>
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                <input className="do-an__view-user-container__table__search__item__input" />
                            </div>
                        </div>
                        <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Ngày kết thúc:
                            </div>
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                <input className="do-an__view-user-container__table__search__item__input" />
                            </div>
                        </div>
                        <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Người duyệt:
                            </div>
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                <input className="do-an__view-user-container__table__search__item__input"/>
                            </div>
                        </div>
                    </div>
                </div>
                <DataTable headerData={columnVoucher}
                            tableData={listVoucher}

                >
                </DataTable>
            </div>
        </div>
    )

}

export default DetailUser;