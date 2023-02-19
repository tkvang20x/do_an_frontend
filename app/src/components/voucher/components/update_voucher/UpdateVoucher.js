import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBook, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateVoucher.scss";
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


const UpdateVoucher = ({ prefixPath }) => {

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

    const { register, setValue, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

    const [listBookUpdate, setListBookUpdate] = useState([])
    const [listBookTable, setListBookTable] = useState([])
    const [openModalUser, setOpenModaluser] = useState(false)
    const [formUpdate, setFormUpdate] = useState({})
    const [valueInput, setValueInput] = useState("")
    const [userDataUpdate, setUserDataUpdate] = useState({})
    const [userInfo, setUserInfo] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { voucher_id } = useParams()
    const [loading, setLoading] = useState(false);

    // const detailUser = useSelector(state => state.userReducer.detailUser)
    const detailVoucher = useSelector(state => state.voucherReducer.detailVoucher)
    console.log(detailVoucher);
    useEffect(() => {
        if(Object.keys(detailVoucher).length === 0){
            VoucherAction.getDetailVoucherAction(dispatch, voucher_id)
        }
    }, [voucher_id])

    useEffect(() => {
        setValue("user_id", detailVoucher?.user_id)
        setValue("due_date", detailVoucher?.due_date)
        setValue("description", detailVoucher?.description)

        setUserInfo(detailVoucher?.users)

        const newBookTable = [...listBookTable]
        const newBookUpdate = [...listBookUpdate]

        detailVoucher?.books_borrowed?.forEach(item => {
            console.log("vao day", item);
            let itemMap = {
                "code_id": item.code_id,
                "name": item?.books.name,
                "avatar": item?.books.avatar,
                "author": item?.books.author,
                "title": item?.books.title
            }

            newBookTable.push(itemMap)
            newBookUpdate.push(item.code_id)
        })

        setListBookTable(newBookTable)
        setListBookUpdate(newBookUpdate)

        setFormUpdate({
            "due_date": detailVoucher?.due_date,
            "user_id": detailVoucher?.user_id,
            "description": detailVoucher?.description,
            "manager_id": "",
            "books_borrowed": newBookUpdate
        })
    }, [detailVoucher])


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
            setUserDataUpdate(response)
        })
        setOpenModaluser(false)
    }

    const handleChangeInput = (value) => {
        setValueInput(value)
    }

    const handleChangeInputForm = (field, value) => {
        const newFormData = { ...formUpdate, [field]: value }
        setFormUpdate(newFormData)
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

            setListBookUpdate([
                ...listBookUpdate,
                valueInput
            ])
            setValueInput("")
        }
    }

    const handleSubmitFormUpdate = () => {
        const formUpdateVoucher = {
            ...formUpdate,
            manager_id: "MANAGER_1674916899",
            books_borrowed: listBookUpdate
        }

        VoucherAction.updateVoucherAction(formUpdateVoucher, dispatch, initPagingFilter)
        navigate(`${prefixPath}/manager/voucher/list`)
    }


    return (
        <form className="do-an__update-voucher__form" onSubmit={handleSubmit(handleSubmitFormUpdate)}>
            <div className='do-an__update-voucher-container'>
                <div className='do-an__update-voucher-container__header'>
                    <div className='do-an__update-voucher-container__header__text'>
                        <button
                            className="do-an__update-voucher-container__header__button"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(-1)}
                            type="button"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} style={{ height: "22px", marginTop: "5px", marginLeft: "5px" }} />
                        </button>
                        <div className='do-an__update-voucher-container__header__title'>Chỉnh sửa phiếu mượn</div>
                    </div>
                </div>
                <div className="do-an__update-voucher-container__body">
                    <div className="do-an__update-voucher-container__body__user-info">
                        <div className="do-an__update-voucher-container__body__user-info__group-info">
                            <div className="do-an__update-voucher-container__body__user-info__group-info__group-first">
                                <div className="do-an__update-voucher-container__body__user-info__group-info__group-input-name">
                                    <div>
                                        Tên bạn đọc<i className="do-an__input-require">*</i>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <input
                                            value={userInfo?.name}
                                            readOnly={true}
                                            className={`do-an__input do-an-input-name-update-voucher ${errors.name ? 'is-invalid' : ''}`}
                                        />
                                        <button
                                            className="do-an__update-voucher-container__body__button"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleOpenModalUser}
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={faPencil} style={{ color: "#141ed2", cursor: "pointer" }}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                </div>
                                <div className="do-an__update-voucher-container__body__user-info__group-info__group-input-code">
                                    <div>
                                        Mã bạn đọc<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <input
                                            // value={formUpdate?.user_id}
                                            readOnly={true}
                                            className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                            {...register("user_id",
                                                {
                                                    required: true,
                                                    onChange: (e) => handleChangeInputForm("user_id", e.target.value)
                                                }
                                            )}
                                        />
                                        {errors.name?.type === "required" &&
                                            <div className="input-value-error">Mã bạn đọc không được trống!</div>}
                                    </div>
                                </div>
                                <div className="do-an__update-voucher-container__body__user-info__group-info__group-input-course">
                                    <div>
                                        Khóa<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <input
                                            value={userInfo?.course}
                                            readOnly={true}
                                            className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="do-an__update-voucher-container__body__user-info__group-info__group-second">
                                <div className="do-an__update-voucher-container__body__user-info__group-info__group-input-start-date">
                                    <div>
                                        Thời gian bắt đầu<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <input
                                            className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                        />
                                    </div>
                                </div>
                                <div className="do-an__update-voucher-container__body__user-info__group-info__group-input-due-date">
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
                                <div className="do-an__update-voucher-container__body__user-info__group-info__group-input-description">
                                    <div>
                                        Ghi chú<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <input
                                            className={`do-an__input do-an-input-description-update-voucher ${errors.name ? 'is-invalid' : ''}`}
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
                        <div className="do-an__update-voucher-container__body__user-info__history-voucher">
                            <div className="do-an__update-voucher-container__body__user-info__history-voucher__icon">
                                <FontAwesomeIcon icon={faBook} style={{ height: "50px", color: "#00089b" }} />
                            </div>
                            <div className="do-an__update-voucher-container__body__user-info__history-voucher__infor">
                                <span>Tổng số phiếu mượn</span>
                                <span>Quá hạn</span>
                                <span>Đã trả</span>
                            </div>
                        </div>
                    </div>
                    <div className="do-an__update-voucher-container__body__table-borrow">
                        <div className="do-an__update-voucher-container__body__table-borrow__header">
                            <div className="do-an__update-voucher-container__body__table-borrow__header__title">
                                Mã sách:
                            </div>
                            <div className="do-an__update-voucher-container__body__table-borrow__header__input">
                                <input
                                    value={valueInput}
                                    className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                    onChange={(event) => handleChangeInput(event.target.value)}
                                />
                            </div>
                            <div className="do-an__update-voucher-container__body__table-borrow__header__button">
                                <Button
                                    type={"normal-green"}
                                    onClick={handleAddBook}
                                >
                                    Thêm
                                </Button>
                            </div>
                        </div>
                        <div className="do-an__update-voucher-container__body__table-borrow__table">
                            <DataTable
                                headerData={columnVoucher}
                                tableData={listBookTable}
                            >

                            </DataTable>
                        </div>
                    </div>
                </div>
                <div className="do-an__update-voucher-container__footer">
                    {/* <Button
                        type={"normal-blue"}
                    >
                        Xác nhận
                    </Button> */}
                    <button type="submit">
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

export default UpdateVoucher;