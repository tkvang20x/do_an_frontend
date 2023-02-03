import React, { useEffect, useState } from 'react';
import './BooksPage.scss';
import imageCover from '../../share/image/1.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../share/ecm-base/components/data-table/DataTable";
import BooksAction from "../../redux/action/BooksAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams } from 'react-router-dom'


const BooksPage = ({ prefixPath }) => {

    const columnBook = [
        {
            title: "Tên sách",
            dataIndex: "name",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Mã sách",
            dataIndex: "code",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "15%"
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "15%"
        },
        {
            title: "Ảnh",
            dataIndex: "avatar",
            render: (text) => {
                return text !== null ? <span>{text}</span> : <span>Không có avatar</span>;
            },
            width: "10%"
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "10%"
        },
        {
            title: "Thể loại",
            dataIndex: "group_code",
            render: (text, index) => {
                return <span>{index?.groups?.group_name}</span>;
            },
            width: "10%"
        },
        {
            title: "Số lượng",
            dataIndex: "total_books",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "10%"
        }
    ]

    var initPagingFilter = {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: 1,
    };

    const listBooks = useSelector(state => state.booksReducer.listBooks)
    const filter = useSelector(state => state.booksReducer.paginationFilter)
    const pagination = useSelector(state => state.booksReducer.pagination)

    const [searchParams, setSearchParams] = useSearchParams({});
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = { ...initPagingFilter }
        if (searchParams.get('name')) {
            urlParams["name"] = searchParams.get('name')
        }
        if (searchParams.get('code')) {
            urlParams["code"] = searchParams.get('code')
        }
        if (searchParams.get('author')) {
            urlParams["author"] = searchParams.get('author')
        }
        if (searchParams.get('group_code')) {
            urlParams["group_code"] = searchParams.get('group_code')
        }
        if (searchParams.get('page')) {
            urlParams["page"] = parseInt(searchParams.get('page'))
        }
        if (searchParams.get('size')) {
            urlParams["size"] = parseInt(searchParams.get('size'))
        }
        if (searchParams.get('order_by')) {
            urlParams["order_by"] = searchParams.get('order_by')
        }
        if (searchParams.get('order')) {
            urlParams["order"] = parseInt(searchParams.get('order'))
        }

        setSearchParams(urlParams)
        BooksAction.updateBooksFilterAction(dispatch, filter, urlParams)
        BooksAction.updateBooksPagination(dispatch, {
            ...pagination,
            page: urlParams.page,
            size: urlParams.size
        })
        console.log(urlParams);
        BooksAction.getListBooksAction(dispatch, urlParams)
    }, [])


    const handleChangeInputSearch = (field, value) => {
        const newSearchFilter = {...filter, [field]: value}

        BooksAction.updateBooksFilterAction(dispatch, newSearchFilter)
    }
    console.log(filter);

    const handleSearch = () => {
        setSearchParams(filter)
        BooksAction.getListBooksAction(dispatch, filter)
    }


    return (
        <div className="do-an__home-page">
            <div className="do-an__home-page__image-cover">
                {/* <img className="image-cover" src={imageCover}></img> */}
                <h3 style={{ margin: "10px 0px 10px 10px" }}>Danh mục sách</h3>
            </div>
            <div className="do-an__home-page__group-search">
                <div className="do-an__home-page__group-search__filter">
                    <div className="do-an__home-page__group-search__item">
                        <div className="do-an__home-page__group-search__item__title">
                            Tên sách:
                        </div>
                        <div className="do-an__home-page__group-search__item__input-container">
                            <input className="do-an__home-page__group-search__item__input" 
                                    onChange={(event) => handleChangeInputSearch("name", event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="do-an__home-page__group-search__item">
                        <div className="do-an__home-page__group-search__item__title">
                            Mã sách:
                        </div>
                        <div className="do-an__home-page__group-search__item__input-container">
                            <input className="do-an__home-page__group-search__item__input" />
                        </div>
                    </div>
                    <div className="do-an__home-page__group-search__item">
                        <div className="do-an__home-page__group-search__item__title">
                            Tác giả:
                        </div>
                        <div className="do-an__home-page__group-search__item__input-container">
                            <input className="do-an__home-page__group-search__item__input" />
                        </div>
                    </div>
                </div>

                <div className="do-an__home-page__group-search__filter">
                    <div className="do-an__home-page__group-search__item">
                        <div className="do-an__home-page__group-search__item__title">
                            Thể loại:
                        </div>
                        <div className="do-an__home-page__group-search__item__input-container">
                            <input className="do-an__home-page__group-search__item__input" />
                        </div>
                    </div>
                    <div className="do-an__home-page__group-search__item">
                        <div className="do-an__home-page__group-search__item__title">
                            Sắp xếp theo:
                        </div>
                        <div className="do-an__home-page__group-search__item__input-container">
                            <input className="do-an__home-page__group-search__item__input" />
                        </div>
                    </div>
                    <div className="do-an__home-page__group-search__item">
                        <div className="do-an__home-page__group-search__item__title">
                            Thứ tự:
                        </div>
                        <div className="do-an__home-page__group-search__item__input-container">
                            <input className="do-an__home-page__group-search__item__input" />
                        </div>
                    </div>
                </div>
                <div className="do-an__home-page__group-search__button-search">
                    <button className="button-search" onClick={handleSearch}>Tìm kiếm</button>
                </div>

            </div>

            <div className="do-an__home-page__group-table">
                <div className="do-an__home-page__group-table__title">

                </div>
                <div className="do-an__home-page__group-table__table-data">
                    <DataTable headerData={columnBook}
                        tableData={listBooks}
                    >

                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default BooksPage;