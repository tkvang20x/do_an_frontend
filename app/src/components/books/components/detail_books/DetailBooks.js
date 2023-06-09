import React, { useEffect, useState } from 'react';

import "./DetailBooks.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo, faFileLines } from "@fortawesome/free-solid-svg-icons";
import image from '../../../../share/image/123.jpg';
import BooksAction from '../../../../redux/action/BooksAction';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ConstAPI, { openNotificationCommon } from '../../../../common/const';
import DataTable from '../../../../share/ecm-base/components/data-table/DataTable';
import BookAction from '../../../../redux/action/BookAction';
import Modal from '../../../../share/ecm-base/components/modal/Modal';
import Button from '../../../../share/ecm-base/components/button/Button';
import UpdateBooks from '../update_books/UpdateBooks';
import DropDown from '../../../../share/ecm-base/components/dropdown-v2/DropDown';
import CreateBook from '../create_book_single/CreateBook';
import { ListButton, ListButtonUser } from '../../../../common/utils';
import Confirm from '../../../../share/ecm-base/components/confirm/Confirm';
import UpdateBook from '../update_book_single/UpdateBook';
import ImageView from '../../../image/ImageView';

const DetailBooks = ({ prefixPath }) => {

    const columnBook = [
        {
            title: "Mã sách",
            dataIndex: "code_id",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Tình trạng sách",
            dataIndex: "status_book",
            render: (text) => {
                return <span>{text === "NEW" ? "Mới" : "Cũ"}</span>
            },
            width: "10%"
        },
        {
            title: "Tình trạng mượn",
            dataIndex: "status_borrow",
            render: (text) => {
                return <span>
                    {text === "BORROWING" ? "Đang cho mượn" : ""}
                    {text === "READY" ? "Sẵn sàng" : ""}
                    {text === "WAITING" ? "Đang chờ duyệt" : ""}
                </span>
            },
            width: "10%"
        },
        {
            title: "Người mượn",
            dataIndex: "user_borrow",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "10%"
        },
        {
            title: "Ngăn số",
            dataIndex: "compartment",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "10%"
        },
        {
            title: "Vị trí",
            dataIndex: "serial",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "10%"
        },
        {
            title: "Mã QR Code",
            dataIndex: "qr_code_data",
            render: (text) => {
                return text !== null ? <img onClick={() => handleModalViewImage(text)} style={{ width: "40px" }} src={`${ConstAPI.BASE_HOST_API}${text}`}></img> : <span>Không có avatar</span>;
            },
            width: "15%"
        },
        {
            title: "Thao tác",
            dataIndex: "code_id",
            render: (code, index) => {
                return (
                    <ListButton
                        onEditAction={() => handleModalUpdateBook(code, index)}
                        onRemoveAction={() => handleDeleteBook(code, index)}
                        removeButtonName="btnDeleteUser"
                    ></ListButton>
                );
            },
            width: "20%"
        }
    ]

    let listStatusBook = [
        {
            title: "Tất cả tình trạng",
            value: "ALL"
        },
        {
            title: "Sách mới",
            value: "NEW"
        },
        {
            title: "Sách cũ",
            value: "OLD"
        }
    ]

    let listStatusBorrow = [
        {
            title: "Tất cả tình trạng",
            value: "ALL"
        },
        {
            title: "Đang chờ duyệt",
            value: "WAITING"
        },
        {
            title: "Sẵn sàng",
            value: "READY"
        },
        {
            title: "Đang cho mượn",
            value: "BORROWING"
        }
    ]

    const booksDetail = useSelector(state => state.booksReducer.detailBooks)

    useEffect(() => {
        BooksAction.getDetailBooksAction(dispatch, code)
    }, [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { code } = useParams()

    var initPagingFilter = {
        page: 1,
        size: 10,
        order_by: "serial",
        order: -1,
    };

    const listBook = useSelector(state => state.bookReducer.listBook)
    const filter = useSelector(state => state.bookReducer.paginationFilter)
    const pagination = useSelector(state => state.bookReducer.pagination)

    useEffect(() => {
        BookAction.getListBookAction(dispatch, code, initPagingFilter)
    }, [])

    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    const handleOpenModalUpdate = () => {
        setOpenModalUpdate(true)
    }

    const onSubmitFormUpdate = () => {
        document.getElementById("do-an-form-update-books-button").click();
    }

    const onCancel = () => {
        setOpenModalUpdate(false)
    }

    const [filterBook, setFilterBook] = useState(initPagingFilter)

    const handleChangeSearchBook = (field, value) => {
        let new_filter_book = { ...filterBook, [field]: value }
        setFilterBook(new_filter_book)
    }

    const handleChangeDropDown = (field, value) => {
        let new_filter_book = {}
        if (value === "ALL") {
            new_filter_book = { ...filterBook, [field]: "" }
        } else {
            new_filter_book = { ...filterBook, [field]: value }
        }
        setFilterBook(new_filter_book)

        BookAction.getListBookAction(dispatch, code, new_filter_book)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            BookAction.getListBookAction(dispatch, code, filterBook)
        }
    }

    const [openModalCreate, setOpenModalCreate] = useState(false)

    const handleOpenModalCreate = () => {
        setOpenModalCreate(true)
    }

    const handleCancelModalCreate = () => {
        setOpenModalCreate(false)
    }

    const onSubmitFormCreate = () => {
        document.getElementById("do-an-form-create-book-button").click();
    }

    const handleNumberItemChange = (newSize, newPage) => {
        console.log(newSize);
        let newSearchFilter = {
            ...filter,
            size: newSize,
            page: 1
        }
        // setSearchParams(newSearchFilter)
        BookAction.updateBookFilterAction(dispatch, newSearchFilter)
        BookAction.updateBookPagination(dispatch, {
            ...pagination,
            size: newSize,
            page: 1
        })
        BookAction.getListBookAction(dispatch, code, newSearchFilter)
    }

    const handleNumberPagehange = (newPage) => {
        let newSearchFilter = {
            ...filter,
            page: newPage
        }
        // setSearchParams(newSearchFilter)
        BookAction.updateBookFilterAction(dispatch, newSearchFilter)
        BookAction.updateBookPagination(dispatch, {
            ...pagination,
            page: newPage
        })
        BookAction.getListBookAction(dispatch, code, newSearchFilter)
    }

    const [isOpenModalImage, setIsOpenModalImage] = useState(false)
    const [dataImage, setDataImage] = useState()
    const [codeDelete, setCodeDelete] = useState(null)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const handleDeleteBook = (codeBook, dataBook) => {
        console.log(dataBook);
        if (dataBook.user_borrow === null || dataBook.user_borrow === "") {
            setCodeDelete(codeBook)
            setOpenModalDelete(true)
        }
        else {
            openNotificationCommon("error", "Thông báo", "Sách đang có người mượn, không thế xóa!")
        }
    }

    const handleDeleteConfirmDialog = () => {
        BookAction.removeBookAction(dispatch, code, codeDelete, filter)
    }

    const handleCancelConfirmDialog = () => {
        setCodeDelete("")
        setOpenModalDelete(false)
    }

    const [openModalSingle, setOpenModalSingle] = useState(false)
    const [dataBook, setDataBook] = useState(null)

    const handleModalUpdateBook = (codeBook, dataBook) => {
        setDataBook(dataBook)
        setOpenModalSingle(!openModalSingle)
    }

    const onSubmitFormUpdateBookSingle = () => {
        document.getElementById("do-an-form-update-book-button").click()
    }

    const handleModalViewImage = (src) => {
        setIsOpenModalImage(true)
        setDataImage(src)
    }

    const handleOnCancelViewImage = () => {
        setIsOpenModalImage(false)
        setDataImage("")
    }

    return (
        <div className='do-an__view-books-container'>
            <div className='do-an__view-books-container__header'>
                <div className='do-an__view-books-container__header__text'>
                    <button
                        className="do-an__view-books-container__header__button"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} style={{ height: "18px", marginTop: "5px", marginLeft: "5px" }} />
                    </button>
                    <div className='do-an__view-books-container__header__title'>Thông tin chi tiết sách</div>
                </div>

                <button
                    className="do-an__view-books-container__header__button-edit button-search"
                    style={{ float: "right", margin: "10px   " }}
                    onClick={handleOpenModalUpdate}
                >
                    Chỉnh sửa
                </button>
            </div>
            <div className='do-an__view-books-container__info'>
                <div className='do-an__view-books-container__info__group-info'>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Tên sách:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail.name}
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Mã sách:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail.code}
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Mô tả:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            <span title={booksDetail.description} className='do-an__view-books-container__info__row__value__text'>
                                {booksDetail.description}
                            </span>
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Tủ số:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail?.cabinet}
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Người tạo:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail.created_by}
                        </div>
                    </div>
                </div>

                <div className='do-an__view-books-container__info__group-info'>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Tác giả:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail.author}
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Tiêu đề sách:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            <span title={booksDetail.description} className='do-an__view-books-container__info__row__value__text'>
                                {booksDetail.title}
                            </span>
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Năm xuất bản:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail.publishing_year}
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Nhà xuất bản:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail.origin}
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Thể loại:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail?.groups?.group_name}

                        </div>
                    </div>
                </div>
                <div className='do-an__view-books-container__info__avatar'>
                    <img className="do-an-preview-image" onClick={() => handleModalViewImage(booksDetail.avatar)} src={`${ConstAPI.BASE_HOST_API}${booksDetail.avatar}`}></img>
                </div>
            </div>
            <div className='do-an__view-books-container__button-add'>
                <button
                    className="do-an__view-books-container__button-add__button button-create-new"
                    style={{ float: "right", margin: "10pxs" }}
                    onClick={handleOpenModalCreate}
                >
                    Thêm mới
                </button>
            </div>
            <div className='do-an__view-books-container__table'>
                <div className='do-an__view-books-container__table__search'>
                    <div className="do-an__view-books-container__table__search__filter">
                        <div className="do-an__view-books-container__table__search__item">
                            <div className="do-an__view-books-container__table__search__item__title">
                                Mã sách:
                            </div>
                            <div className="do-an__view-books-container__table__search__item__input-container">
                                <input className="do-an__view-books-container__table__search__item__input"
                                    onChange={(event) => handleChangeSearchBook("code_id", event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>
                        </div>
                        <div className="do-an__view-books-container__table__search__item">
                            <div className="do-an__view-books-container__table__search__item__title">
                                Tình trạng sách:
                            </div>
                            <div className="do-an__view-books-container__table__search__item__input-container">
                                <DropDown
                                    className="do-an__view-books-container__table__search__item__input"
                                    listItem={listStatusBook}
                                    selected={filterBook?.status_book || "ALL"}
                                    name="status_book"
                                    onSelected={handleChangeDropDown}
                                >
                                </DropDown>

                            </div>
                        </div>
                        <div className="do-an__view-books-container__table__search__item">
                            <div className="do-an__view-books-container__table__search__item__title">
                                Tình trạng mượn:
                            </div>
                            <div className="do-an__view-books-container__table__search__item__input-container">
                                <DropDown
                                    className="do-an__view-books-container__table__search__item__input"
                                    listItem={listStatusBorrow}
                                    selected={filterBook?.status_borrow || "ALL"}
                                    name="status_borrow"
                                    onSelected={handleChangeDropDown}
                                >
                                </DropDown>
                            </div>
                        </div>
                        <div className="do-an__view-books-container__table__search__item">
                            <div className="do-an__view-books-container__table__search__item__title">
                                Người mượn:
                            </div>
                            <div className="do-an__view-books-container__table__search__item__input-container">
                                <input className="do-an__view-books-container__table__search__item__input"
                                    onChange={(event) => handleChangeSearchBook("user_borrow", event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <DataTable headerData={columnBook}
                    tableData={listBook}
                    pagination={pagination}
                    onNumberItemChange={handleNumberItemChange}
                    onPageChange={handleNumberPagehange}
                >
                </DataTable>
            </div>

            {openModalUpdate &&
                <Modal
                    title="Cập nhật thông tin sách"
                    width="70%"
                    onCancel={onCancel}
                    visible={openModalUpdate}
                    footer={
                        <div className='do-an__modal__footer'>
                            <Button
                                type={"normal-blue"}
                                onClick={onSubmitFormUpdate}
                            >
                                Cập nhật
                            </Button>
                            <Button
                                type={"normal-gray"}
                                onClick={onCancel}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    }
                >
                    <UpdateBooks onCloseModal={onCancel}>

                    </UpdateBooks>
                </Modal>
            }

            {openModalCreate &&
                <Modal
                    title="Tạo thêm sách"
                    width="50%"
                    onCancel={handleCancelModalCreate}
                    visible={openModalCreate}
                    footer={
                        <div className='do-an__modal__footer'>
                            <Button
                                type={"normal-blue"}
                                onClick={onSubmitFormCreate}
                            >
                                Thêm mới
                            </Button>
                            <Button
                                type={"normal-gray"}
                                onClick={handleCancelModalCreate}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    }
                >
                    <CreateBook codeBooks={code} onCloseModal={handleCancelModalCreate}></CreateBook>
                </Modal>
            }
            <Confirm
                title="Xoá sách đơn"
                width="45%"
                visible={openModalDelete}
                onCancel={handleCancelConfirmDialog}
                onOk={handleDeleteConfirmDialog}
            >
                <p>Xác nhận xóa sách {codeDelete}?</p>
            </Confirm>

            {openModalSingle &&
                <Modal
                    title="Cập nhật thông tin sách"
                    width="40%"
                    onCancel={handleModalUpdateBook}
                    visible={openModalSingle}
                    footer={
                        <div className='do-an__modal__footer'>
                            <Button
                                type={"normal-blue"}
                                onClick={onSubmitFormUpdateBookSingle}
                            >
                                Cập nhật
                            </Button>
                            <Button
                                type={"normal-gray"}
                                onClick={handleModalUpdateBook}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    }
                >
                    <UpdateBook codeBooks={code} dataBook={dataBook} onCloseModal={handleModalUpdateBook}>

                    </UpdateBook>
                </Modal>
            }

            {isOpenModalImage &&
                <Modal
                    title="Ảnh"
                    width="40%"
                    onCancel={handleOnCancelViewImage}
                    visible={isOpenModalImage}
                >
                    <ImageView src={dataImage}>

                    </ImageView>

                </Modal>
            }
        </div>
    )

}

export default DetailBooks;