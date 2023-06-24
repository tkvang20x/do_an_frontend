import React, { useEffect, useState } from "react";

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
import ConstAPI, { openNotificationCommon } from "../../../../common/const";
import VoucherAction from "../../../../redux/action/VoucherAction";
import { DatePicker } from 'antd';
import moment from 'moment';


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
                return <span
                    style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        width: "150px"
                    }}
                >{text}</span>
            },
            width: "15%"
        },
        {
            title: "Thao tác",
            dataIndex: "code_id",
            render: (code_id) => {
                return (
                    <ListButtonUser
                    onRemoveAction={() => handleRemoveAction(code_id)}
                        editDisable={true}
                    ></ListButtonUser>
                );
            },
            width: "5%"
        }
    ]

    const { setValue, register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

    const [listBookTable, setListBookTable] = useState([])
    const [openModalUser, setOpenModaluser] = useState(false)
    const [valueInput, setValueInput] = useState("")
    const [dataUser, setDataUser] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()



    // const detailUser = useSelector(state => state.userReducer.detailUser)

    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1 > 9 ? currentdate.getMonth() + 1 : ("0" + (currentdate.getMonth() + 1))) + "-"
        + (currentdate.getDate() < 10 ? ("0" + currentdate.getDate()) : currentdate.getDate()) + "-"
        + (currentdate.getHours() < 10 ? ("0" + currentdate.getHours()) : currentdate.getHours()) + ":"
        + (currentdate.getMinutes() < 10 ? ("0" + currentdate.getMinutes()) : currentdate.getMinutes()) + ":"
        + (currentdate.getSeconds() < 10 ? ("0" + currentdate.getSeconds()) : currentdate.getSeconds());

    const [formCreate, setFormCreate] = useState({ due_date: "" })

    useEffect(() => {
        setValue("check_due_date", formCreate?.due_date)
    }, [formCreate?.due_date])

    console.log(formCreate);

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
            setDataUser(response)
            setFormCreate({
                ...formCreate,
                "user_id": response.code
            })
            setValue("name", response?.name)

        })
        delete errors.name
        setOpenModaluser(false)
    }

    const handleChangeInput = (value) => {
        setValueInput(value)
    }

    const handleChangeInputForm = (field, value) => {
        let newFormData = {}
        if (field === "due_date" && value !== '') {
            newFormData = { ...formCreate, [field]: value.format("YYYY-MM-DD-HH:mm:ss") }
            if (errors.check_due_date?.type) {
                delete errors.check_due_date
            }
        } else {
            newFormData = { ...formCreate, [field]: value }
        }
        setFormCreate(newFormData)
    }

    const handleAddBook = () => {
        if (valueInput.trim() !== "") {
            BookAction.getDetailBookAction(dispatch, valueInput).then(response => {
                if (response.status === 200) {
                    console.log(response.data.data);
                    if(response.data.data.user_borrow ===  "" || response.data.data.user_borrow === null){

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
                    }else{
                        openNotificationCommon("error", "Thông báo", "Sách đang có người mượn!")

                    }
                }
            })
            // setListBookCreate([
            //     ...listBookCreate,
            //     valueInput
            // ])

            setValueInput("")
        }
    }

    const managerToken = useSelector(state => state.loginReducer.dataToken)

    const handleSubmitFormCreate = () => {
        if (listBookTable.length === 0) {
            openNotificationCommon("error", "Thông báo", "Danh sách sách mượn không được để trống!")
            return
        }
        const formCreateVoucher = {
            ...formCreate,
            books_borrowed: listBookTable
        }

        VoucherAction.createVoucherAction(formCreateVoucher, dispatch, initPagingFilter)
        navigate(`${prefixPath}/manager/voucher/list`)
    }

    const handleRemoveAction = (code_id) => {
        let index = listBookTable.findIndex(item => item.code_id === code_id)
        let array = [...listBookTable]

        if (index > -1){
            array.splice(index , 1)
            setListBookTable(array)
        }
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
                            type="button"
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
                                        Tên người dùng<i className="do-an__input-require">*</i>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <input
                                            value={dataUser?.name}
                                            readOnly={true}
                                            className={`do-an__input do-an-input-name-create-voucher ${errors.name ? 'is-invalid' : ''}`}
                                            {...register("name",
                                                {
                                                    required: true
                                                }
                                            )}
                                        />
                                        <button
                                            className="do-an__create-voucher-container__body__button"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleOpenModalUser}
                                        >
                                            <FontAwesomeIcon icon={faPencil} style={{ color: "#141ed2", cursor: "pointer" }}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                    {errors.name?.type === "required" &&
                                        <div className="input-value-error">Tên người dùng không được trống!</div>}

                                </div>
                                <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-code">
                                    <div>
                                        Mã người dùng<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <input
                                            value={dataUser?.code}
                                            readOnly={true}
                                            className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                        // {...register("user_id",
                                        //     {
                                        //         required: true
                                        //     }
                                        // )}
                                        />
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
                                        Thời gian tạo<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <input
                                            className={`do-an__input ${errors.name ? 'is-invalid' : ''}`}
                                            disabled={true}
                                            value={datetime}
                                        />
                                    </div>
                                </div>
                                <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-due-date">
                                    <div>
                                        Thời gian hẹn trả<i className="do-an__input-require">*</i>
                                    </div>
                                    <div>
                                        <DatePicker showTime onChange={(e) => handleChangeInputForm("due_date", e)}
                                            placeholder="Ngày hẹn trả"
                                            clearIcon={true}
                                            disabledDate={(current) => {
                                                return moment().add(-1, 'days') >= current ||
                                                    moment().add(3, 'month') <= current;
                                            }}
                                        />

                                        <input
                                            hidden={true}
                                            onChange={(e) => handleChangeInputForm("due_date", e)}
                                            {...register("check_due_date",
                                                {
                                                    required: true
                                                }
                                            )}
                                        />
                                        {errors.check_due_date?.type === "required" &&
                                            <div className="input-value-error">Ngày hạn trả không được trống!</div>}
                                    </div>
                                </div>
                                <div className="do-an__create-voucher-container__body__user-info__group-info__group-input-description">
                                    <div>
                                        Ghi chú
                                    </div>
                                    <div>
                                        <input
                                            className={`do-an__input do-an-input-description-create-voucher ${errors.name ? 'is-invalid' : ''}`}
                                            {...register("description",
                                                {
                                                    onChange: (e) => handleChangeInputForm("description", e.target.value)
                                                }
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="do-an__create-voucher-container__body__user-info__history-voucher">
                            <div className="do-an__create-voucher-container__body__user-info__history-voucher__icon">
                                <FontAwesomeIcon icon={faBook} style={{ height: "50px", color: "#00089b" }} />
                            </div>
                            <div className="do-an__create-voucher-container__body__user-info__history-voucher__infor">
                                <span>Tổng số phiếu mượn</span>
                                <span>Quá hạn</span>
                                <span>Đã trả</span>
                            </div>
                        </div> */}
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
                        title="Chọn người dùng"
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