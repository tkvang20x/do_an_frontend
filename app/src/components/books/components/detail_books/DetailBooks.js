import React, { useEffect, useState } from 'react';

import "./DetailBooks.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo, faFileLines } from "@fortawesome/free-solid-svg-icons";
import image from '../../../../share/image/123.jpg';
import BooksAction from '../../../../redux/action/BooksAction';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ConstAPI from '../../../../common/const';
import DataTable from '../../../../share/ecm-base/components/data-table/DataTable';
import BookAction from '../../../../redux/action/BookAction';

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
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Tình trạng mượn",
            dataIndex: "status_borrow",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Người mượn",
            dataIndex: "user_borrow",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Mã QR Code",
            dataIndex: "qr_code_data",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
    ]

    const booksDetail = useSelector(state => state.booksReducer.detailBooks)

    useEffect(() => {
        BooksAction.getDetailBooksAction(dispatch, code)
    }, [])
    const dispatch = useDispatch()
    const { code } = useParams()

    var initPagingFilter = {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: -1,
    };

    const listBook = useSelector(state => state.bookReducer.listBook)
    const filter = useSelector(state => state.bookReducer.paginationFilter)
    const pagination = useSelector(state => state.bookReducer.pagination)

    useEffect(() => {
        BookAction.getListBookAction(dispatch, code, initPagingFilter)
    }, [])
    return (
        <div className='do-an__view-books-container'>
            <div className='do-an__view-books-container__header'>
                <div className='do-an__view-books-container__header__text'>
                    <button
                        className="do-an__view-books-container__header__button"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} style={{ height: "22px", marginTop: "5px", marginLeft: "5px" }} />
                    </button>
                    <div className='do-an__view-books-container__header__title'>Thông tin chi tiết sách</div>
                </div>

                <button
                    className="do-an__view-books-container__header__button-edit button-search"
                    style={{ float: "right" }}
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
                            {booksDetail.description}
                        </div>
                    </div>
                    <div className='do-an__view-books-container__info__row'>
                        <div className='do-an__view-books-container__info__row__title'>
                            Ngày tạo:
                        </div>
                        <div className='do-an__view-books-container__info__row__value'>
                            {booksDetail.created_time}
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
                            {booksDetail.title}
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
                    <img className="do-an-preview-image" src={`${ConstAPI.BASE_HOST_API}${booksDetail.avatar}`}></img>
                </div>
            </div>
            <div className='do-an__view-books-container__table'>
                <DataTable headerData={columnBook}
                    tableData={listBook}
                    pagination={pagination}
                >

                </DataTable>
            </div>

        </div>
    )

}

export default DetailBooks;