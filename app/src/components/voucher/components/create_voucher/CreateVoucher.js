import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBook, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import "./CreateVoucher.scss";
import Button from "../../../../share/ecm-base/components/button/Button";
import DataTable from "../../../../share/ecm-base/components/data-table/DataTable";
import { ListButton } from "../../../../common/utils";
import Modal from "../../../../share/ecm-base/components/modal/Modal";
import UserPageVoucher from "../user_voucher/UserPageVoucher";
import UserAction from "../../../../redux/action/UserAction";
import { useSelector, useDispatch } from "react-redux";


const CreateVoucher = ({ prefixPath }) => {

    const columnVoucher = [
        {
            title: "Mã sách",
            dataIndex: "code_id",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Tên sách",
            dataIndex: "name",
            render: (text, index) => {
                return <span>{index.books.name}</span>
            },
            width: "15%"
        },
        {
            title: "Số lượng có thể mượn",
            dataIndex: "total_books_ready",
            render: (text, index) => {
                return <span>{index.books.total_books_ready}</span>
            },
            width: "15%"
        },
        {
            title: "Thao tác",
            dataIndex: "code_id",
            render: (code_id) => {
                return (
                    <ListButton
                    ></ListButton>
                );
            },
            width: "15%"
        }
    ]

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

    const [listBook, setListBook] = useState([])
    const [openModalUser, setOpenModaluser] = useState(false)
    const dispatch = useDispatch()

    const handleOpenModalUser = () => {
        setOpenModaluser(true)
    }

    const handleCloseModalUser = () => {
        setOpenModaluser(false)
    }

    const handleSelectUser = (user_id) => {
        UserAction.getDetailUserAction(dispatch, user_id)
        setOpenModaluser(false)
    }

    const detailUser = useSelector(state => state.userReducer.detailUser)

    console.log(detailUser);




    const navigate = useNavigate()


    return (
        <div className='do-an__create-voucher-container'>
            <div className='do-an__create-voucher-container__header'>
                <div className='do-an__create-voucher-container__header__text'>
                    <button
                        className="do-an__create-voucher-container__header__button"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} style={{ height: "22px", marginTop: "5px", marginLeft: "5px" }} />
                    </button>
                    <div className='do-an__create-voucher-container__header__title'>Lập phiếu mượn</div>
                </div>
            </div>
            <div className="do-an__create-voucher-container__body">
                <div className="do-an__create-voucher-container__body__user-info">
                    <div className="do-an__create-voucher-container__body__user-info__group-info">
                        <div className="do-an__create-voucher-container__body__user-info__group-info__group-first">
                            <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-name">
                                <div>
                                    Tên bạn đọc<i className="do-an__input-require">*</i>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input
                                    value={detailUser?.name}
                                        readOnly={true}
                                        className={`do-an__input do-an-input-name-create-voucher ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                    <button
                                        className="do-an__create-voucher-container__body__button"
                                        style={{ cursor: "pointer" }}
                                        onClick={handleOpenModalUser}
                                    >
                                        <FontAwesomeIcon icon={faPencil} style={{ color: "#141ed2", cursor: "pointer" }}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                            <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-code">
                                <div>
                                    Mã bạn đọc<i className="do-an__input-require">*</i>
                                </div>
                                <div>
                                    <input
                                    value={detailUser?.code}
                                        readOnly={true}
                                        className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-course">
                                <div>
                                    Khóa<i className="do-an__input-require">*</i>
                                </div>
                                <div>
                                    <input
                                    value={detailUser?.course}
                                        readOnly={true}
                                        className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="do-an__create-voucher-container__body__user-info__group-info__group-second">
                            <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-start-date">
                                <div>
                                    Thời gian bắt đầu<i className="do-an__input-require">*</i>
                                </div>
                                <div>
                                    <input
                                        className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-due-date">
                                <div>
                                    Thời gian hẹn trả<i className="do-an__input-require">*</i>
                                </div>
                                <div>
                                    <input
                                        className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-description">
                                <div>
                                    Ghi chú<i className="do-an__input-require">*</i>
                                </div>
                                <div>
                                    <input
                                        className={`do-an__input do-an-input-description-create-voucher ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="do-an__create-voucher-container__body__user-info__history-voucher">
                        <div className="do-an__create-voucher-container__body__user-info__history-voucher__icon">
                            <FontAwesomeIcon icon={faBook} style={{ height: "50px", color: "#00089b" }} />
                        </div>
                        <div className="do-an__create-voucher-container__body__user-info__history-voucher__infor">
                            <span>Tổng số phiếu mượn</span>
                            <span>Quá hạn</span>
                            <span>Đã trả</span>
                        </div>
                    </div>
                </div>
                <div className="do-an__create-voucher-container__body__table-borrow">
                    <div className="do-an__create-voucher-container__body__table-borrow__header">
                        <div className="do-an__create-voucher-container__body__table-borrow__header__title">
                            Mã sách:
                        </div>
                        <div className="do-an__create-voucher-container__body__table-borrow__header__input">
                            <input
                                className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                            />
                        </div>
                        <div className="do-an__create-voucher-container__body__table-borrow__header__button">
                            <Button
                                type={"normal-green"}
                            >
                                Thêm
                            </Button>
                        </div>
                    </div>
                    <div className="do-an__create-voucher-container__body__table-borrow__table">
                        <DataTable
                            headerData={columnVoucher}
                            tableData={[]}
                        >

                        </DataTable>
                    </div>
                </div>
            </div>
            <div className="do-an__create-voucher-container__footer">
                <Button
                    type={"normal-blue"}
                >
                    Xác nhận
                </Button>
            </div>

            {openModalUser && 
                 <Modal
                 title="Chọn bạn đọc"
                 width="70%"
                 onCancel={handleCloseModalUser}
                 visible={openModalUser}
             >
                <UserPageVoucher handleSelectUser={handleSelectUser}></UserPageVoucher>
             </Modal>
            }
        </div>
    )
}

export default CreateVoucher;