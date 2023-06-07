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
import VoucherAction from '../../../../redux/action/VoucherAction';
import { DatePicker, } from 'antd';
import DropDown from '../../../../share/ecm-base/components/dropdown-v2/DropDown';

const { RangePicker } = DatePicker;

const DetailUser = ({ prefixPath }) => {

    const columnVoucher = [
        {
            title: "Mã thẻ mượn",
            dataIndex: "voucher_id",
            render: (text) => {
                return <Link to={`${prefixPath}/manager/voucher/${text}`}>{text}</Link>;
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
            dataIndex: "manager_name",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Số lượng sách",
            dataIndex: "books_borrowed",
            render: (text) => {
                return <span>{text.length}</span>
            },
            width: "20%"
        },
        {
            title: "Trạng thái",
            dataIndex: "status_voucher",
            className: "button-center-table",
            render: (text) => {
                return <div className={`do-an-status-voucher-${text}`}>
                    {text === "WAITING_CONFIRM" ? "Chờ xác nhận" : ""}
                    {text === "CONFIRMED" ? "Đã xác nhận" : ""}
                    {text === "PAYED" ? "Đã trả" : ""}
                    {text === "EXPIRED" ? "Quá hạn" : ""}
                    {text === "CANCELLED" ? "Đã hủy" : ""}
                </div>
            },
            width: "10%"
        },
    ]

    let listStatus = [
        {
            title: "Tất cả trạng thái",
            value: "ALL"
        },
        {
            title: "Chờ duyệt",
            value: "WAITING_CONFIRM"
        },
        {
            title: "Đã duyệt",
            value: "CONFIRMED"
        },
        {
            title: "Đã trả",
            value: "PAYED"
        },
        {
            title: "Đã quá hạn",
            value: "EXPIRED"
        },
        {
            title: "Đã hủy",
            value: "CANCELLED"
        },
    ]

    const userDetail = useSelector(state => state.userReducer.detailUser)
    const listVoucher = useSelector(state => state.voucherReducer.listVoucher)
    const pagination = useSelector(state => state.voucherReducer.pagination)
    const [filter, setFilter] = useState({})
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
        setFilter({
            page: 1,
            size: 10,
            order_by: "created_time",
            order: -1,
            user_id: code
        })
    }, [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { code } = useParams()

    const handleChangeDebut = (range) => {
        if (range === null || range === undefined) {
            let newSearchFilter = {
                ...filter
            }
            delete newSearchFilter.start_date
            delete newSearchFilter.due_date

            VoucherAction.getListVoucherAction(dispatch, filter)

        }

        else {
            const valueOfInput1 = range[0].format("YYYY-MM-DD-HH:mm:ss");
            const valueOfInput2 = range[1].format("YYYY-MM-DD-HH:mm:ss");

            console.log('start date', valueOfInput1);
            console.log("end date", valueOfInput2);

            let newSearchFilter = {
                ...filter,
                page: 1,
                start_date: valueOfInput1,
                due_date: valueOfInput2
            }

            VoucherAction.getListVoucherAction(dispatch, newSearchFilter)

        }
    }

    const handleChangeInputSearch = (field, value) => {
        console.log(field, value);
        let newSearchFilter = { ...filter, page: 1 }
        if (field === "status_voucher" && value === "ALL") {
            delete newSearchFilter.status_voucher
        } else {
            newSearchFilter = { ...filter, page: 1, [field]: value }
        }

        setFilter(newSearchFilter)
        VoucherAction.getListVoucherAction(dispatch, newSearchFilter)

    }

    const handleSearch = () => {
        VoucherAction.getListVoucherAction(dispatch, filter)
    }

    return (
        <div className='do-an__view-user-container'>
            <div className='do-an__view-user-container__header'>
                <div className='do-an__view-user-container__header__text'>
                    <button
                        className="do-an__view-user-container__header__button"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} style={{ height: "20px", marginTop: "12px", marginLeft: "5px" }} />
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
                            {userDetail?.name}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Mã người dùng:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail?.code}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Ngày sinh:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail?.date_of_birth}
                        </div>
                    </div>
                    <div className='do-an__view-user-container__info__row'>
                        <div className='do-an__view-user-container__info__row__title'>
                            Giới tính:
                        </div>
                        <div className='do-an__view-user-container__info__row__value'>
                            {userDetail?.gender === "FEMALE" ? "Nữ" : "Nam"}
                        </div>
                    </div>
                    {userDetail?.role === "STUDENT" &&
                        <div className='do-an__view-user-container__info__row'>
                            <div className='do-an__view-user-container__info__row__title'>
                                Khóa:
                            </div>
                            <div className='do-an__view-user-container__info__row__value'>
                                {userDetail?.course}
                            </div>
                        </div>
                    }
                    {userDetail?.role === "TEACHER" &&
                        <div className='do-an__view-user-container__info__row'>
                            <div className='do-an__view-user-container__info__row__title'>
                                Chuyên ngành:
                            </div>
                            <div className='do-an__view-user-container__info__row__value'>
                                {userDetail?.specialized}
                            </div>
                        </div>
                    }
                    {userDetail?.role === "TEACHER" &&
                        <div className='do-an__view-user-container__info__row'>
                            <div className='do-an__view-user-container__info__row__title'>
                                Phòng ban:
                            </div>
                            <div className='do-an__view-user-container__info__row__value'>
                                {userDetail?.department}
                            </div>
                        </div>
                    }
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
                    <img className="do-an-preview-image" src={userDetail.avatar === null ? image : `${ConstAPI.BASE_HOST_API}${userDetail.avatar}`}></img>
                </div>
            </div>
            <div className='do-an__view-user-container__table'>
                <div className='do-an__view-user-container__table__search'>
                    <div className="do-an__view-user-container__table__search__filter">
                        <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Tình trạng phiếu mượn:
                            </div>
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                {/* <input className="do-an__view-user-container__table__search__item__input" /> */}

                                <DropDown className="do-an__view-user-container__table__search__item__input"
                                    listItem={listStatus}
                                    selected={filter?.status_voucher || "ALL"}
                                    name="status_voucher"
                                    onSelected={handleChangeInputSearch}
                                />
                            </div>
                        </div>
                        <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Ngày tạo phiếu:
                            </div>
                            {/* <div className="do-an__view-user-container__table__search__item__input-container">
                                <input className="do-an__view-user-container__table__search__item__input" />
                            </div> */}
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                {/* <input className="do-an__voucher__group-search__item__input"
                            /> */}
                                <RangePicker showTime
                                    onChange={(event) => handleChangeDebut(event)}
                                    placeholder={["Từ ngày", " Đến ngày"]}
                                // defaultPickerValue={[moment(searchParams?.start_date), moment(searchParams?.due_date)]}
                                >

                                </RangePicker>
                            </div>
                        </div>
                        {/* <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Ngày kết thúc:
                            </div>
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                <input className="do-an__view-user-container__table__search__item__input" />
                            </div>
                        </div> */}
                        <div className="do-an__view-user-container__table__search__item">
                            <div className="do-an__view-user-container__table__search__item__title">
                                Người duyệt:
                            </div>
                            <div className="do-an__view-user-container__table__search__item__input-container">
                                <input className="do-an__view-user-container__table__search__item__input"
                                    onChange={(event) => handleChangeInputSearch("manager_name", event.target.value)}

                                />
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