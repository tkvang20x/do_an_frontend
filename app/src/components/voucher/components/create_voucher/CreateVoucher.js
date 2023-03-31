import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBook, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import "./CreateVoucher.scss";
import Button from "../../../../share/ecm-base/components/button/Button";
import DataTable from "../../../../share/ecm-base/components/data-table/DataTable";
import { ListButton, ListButtonUser } from "../../../../common/utils";
import Modal from "../../../../share/ecm-base/components/modal/Modal";
import UserPageVoucher from "../user_voucher/UserPageVoucher";
import UserAction from "../../../../redux/action/UserAction";
import { useSelector, useDispatch } from "react-redux";
import BookAction from "../../../../redux/action/BookAction";
import ConstAPI from "../../../../common/const";
import VoucherAction from "../../../../redux/action/VoucherAction";


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
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Ảnh",
            dataIndex: "avatar",
            render: (text) => {
                return text !== null ? <img style={{ width: "40px" }} src={`${ConstAPI.BASE_HOST_API}${text}`}></img> : <span>Không có avatar</span>;
            },
            width: "15%"
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Thao tác",
            dataIndex: "code_id",
            render: (code_id) => {
                return (
                    <ListButtonUser
                        editDisable={true}
                    ></ListButtonUser>
                );
            },
            width: "5%"
        }
    ]

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

    const [listBookCreate, setListBookCreate] = useState([])
    const [listBookTable, setListBookTable] = useState([])
    const [openModalUser, setOpenModaluser] = useState(false)
    const [formCreate, setFormCreate] = useState({})
    const [valueInput, setValueInput] = useState("")
    const [dataUser, setDataUser] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const detailUser = useSelector(state => state.userReducer.detailUser)

    var initPagingFilter = {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: -1,
    };

    const handleOpenModalUser = () => {
        setOpenModaluser(true)
    }

    const handleCloseModalUser = () => {
        setOpenModaluser(false)
    }

    const handleSelectUser = (user_id) => {
        UserAction.getDetailUserAction(dispatch, user_id).then(response => {
            console.log(response);
            setDataUser(response)
            setFormCreate({
                ...formCreate,
                "user_id": response.code
            })
        })
        setOpenModaluser(false)
    }

    const handleChangeInput = (value) => {
        setValueInput(value)
    }

    const handleChangeInputForm = (field, value) => {
        const newFormData = {...formCreate, [field]: value}
        setFormCreate(newFormData)
    }

    const handleAddBook = () => {
        if (valueInput.trim() !== "") {
            BookAction.getDetailBookAction(dispatch, valueInput).then(response => {
                if (response.status === 200) {
                    setListBookTable([
                        ...listBookTable,
                        {
                            "code_id": valueInput,
                            "name": response.data.data.books.name,
                            "avatar": response.data.data.books.avatar,
                            "author": response.data.data.books.author,
                            "title": response.data.data.books.title
                        }
                    ])
                }
            })

            setListBookCreate([
                ...listBookCreate,
                valueInput
            ])
            setValueInput("")
        }
    }

    console.log(formCreate);
    const managerToken = useSelector(state => state.loginReducer.dataToken)

    const handleSubmitFormCreate = () => {
        const formCreateVoucher = {
            ...formCreate,
            books_borrowed: listBookCreate
        }

        VoucherAction.createVoucherAction(formCreateVoucher,dispatch, initPagingFilter)
        navigate(`${prefixPath}/manager/voucher/list`)
    }


    return (
        <form className="do-an__create-voucher__form" onSubmit={handleSubmit(handleSubmitFormCreate)}>
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
                                            value={dataUser?.name}
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
                                            value={dataUser?.code}
                                            readOnly={true}
                                            className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                            {...register("user_id",
                                                {
                                                    // required: true,
                                                    // onChange: (e) => handleChangeInputForm("user_id", e.target.value)
                                                }
                                            )}
                                        />
                                        {/* {errors.name?.type === "required" &&
                                            <div className="input-value-error">Mã bạn đọc không được trống!</div>} */}
                                    </div>
                                </div>
                                <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-course">
                                    <div>
                                        Khóa<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <input
                                            value={dataUser?.course}
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
                                            {...register("due_date",
                                                {
                                                    required: true,
                                                    onChange: (e) => handleChangeInputForm("due_date", e.target.value)
                                                }
                                            )}
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
                                            {...register("description",
                                                {
                                                    required: true,
                                                    onChange: (e) => handleChangeInputForm("description", e.target.value)
                                                }
                                            )}
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
                                    value={valueInput}
                                    className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                    onChange={(event) => handleChangeInput(event.target.value)}
                                />
                            </div>
                            <div className="do-an__create-voucher-container__body__table-borrow__header__button">
                                <Button
                                    type={"normal-green"}
                                    onClick={handleAddBook}
                                >
                                    Thêm
                                </Button>
                            </div>
                        </div>
                        <div className="do-an__create-voucher-container__body__table-borrow__table">
                            <DataTable
                                headerData={columnVoucher}
                                tableData={listBookTable}
                            >

                            </DataTable>
                        </div>
                    </div>
                </div>
                <div className="do-an__create-voucher-container__footer">
                    {/* <Button
                        type={"normal-blue"}
                    >
                        Xác nhận
                    </Button> */}
                    <button className="button-search" type="submit">
                        Xác nhận
                    </button>
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
        </form>

    )
}

export default CreateVoucher;