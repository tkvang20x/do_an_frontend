import React, { useEffect, useState } from 'react';
import './BooksPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../share/ecm-base/components/data-table/DataTable";
import BooksAction from "../../redux/action/BooksAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, Link } from 'react-router-dom';
import GroupsAction from "../../redux/action/GroupsAction";
import DropDown from '../../share/ecm-base/components/dropdown-v2/DropDown';
import Modal from '../../share/ecm-base/components/modal/Modal';
import Button from '../../share/ecm-base/components/button/Button';
import CreateBooks from './components/create_books/CreateBooks';
import { ListButton } from '../../common/utils';
import ConstAPI from '../../common/const';
import Confirm from '../../share/ecm-base/components/confirm/Confirm';
import UpdateBooks from './components/update_books/UpdateBooks';

const BooksPage = ({ prefixPath }) => {


    const columnBooks = [
        {
            title: "Mã sách",
            dataIndex: "code",
            render: (text) => {
                return <Link to={`${prefixPath}/manager/books/${text}`}>{text}</Link>;
            },
            width: "15%"
        },
        {
            title: "Tên sách",
            dataIndex: "name",
            render: (text) => {
                return <span
                    title={text}
                    style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        width: "200px"
                    }}
                >{text}</span>
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
                return text !== null ? <img style={{ width: "40px" }} src={`${ConstAPI.BASE_HOST_API}${text}`}></img> : <span>Không có avatar</span>;
            },
            width: "10%"
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            render: (text) => {
                return <span
                title={text}
                style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    width: "150px"
                }}
                >{text}</span>;
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
            title: "Tủ đựng",
            dataIndex: "cabinet",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "8%"
        },
        {
            title: "Số lượng",
            dataIndex: "total_books",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "10%"
        },
        {
            title: "Thao tác",
            dataIndex: "code",
            render: (code) => {
                return (
                    <ListButton
                        onRemoveAction={() => handleDeleteBooks(code)}
                        removeButtonName="btnDeleteBooks"
                        onEditAction={() => {handleEditBooks(code)}}
                    ></ListButton>
                );
            },
            width: "15%"
        }
    ]

    let listOrder = [
        {
            title: "Tăng dần",
            value: 1
        },
        {
            title: "Giảm dần",
            value: -1
        },
    ]

    let listOrderBy = [
        {
            title: "Thời gian tạo",
            value: "created_time"
        },
        {
            title: "Thời gian sửa",
            value: "modified_time"
        },
    ]

    var initPagingFilter = {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: -1,
    };

    const listBooks = useSelector(state => state.booksReducer.listBooks)
    const filter = useSelector(state => state.booksReducer.paginationFilter)
    const pagination = useSelector(state => state.booksReducer.pagination)

    const listGroups = useSelector(state => state.groupsReducer.listGroups)

    const [searchParams, setSearchParams] = useSearchParams({});
    const dispatch = useDispatch();

    const [isHiddenModalCreateBooks, setIsHiddenModalCreateBooks] = useState(false)

    useEffect(() => {
        let urlParams = { ...initPagingFilter }
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
        BooksAction.updateBooksFilterAction(dispatch, urlParams)
        BooksAction.updateBooksPagination(dispatch, {
            ...pagination,
            page: urlParams.page,
            size: urlParams.size
        })
        BooksAction.getListBooksAction(dispatch, urlParams)
    }, [])

    useEffect(() => {
        GroupsAction.getListGroupsAction(dispatch)
    }, [])

    let listDefault = [
        {
            title: "Tất cả thể loại",
            value: "ALL"
        }
    ]

    const [listDefaultDropDown, setListDefaultDropDown] = useState(listDefault)


    useEffect(() => {
        let listGrgoupsDropDown = listGroups.map((item) => {
            return {
                title: item?.group_name,
                value: item?.group_code
            }
        })
        setListDefaultDropDown([...listDefault, ...listGrgoupsDropDown])
    }, [listGroups])

    const onCancel = () => {
        setIsHiddenModalCreateBooks(!isHiddenModalCreateBooks)
    }


    const handleChangeInputSearch = (field, value) => {
        let newSearchFilter = { ...filter }
        if (field === "group_code" && value === "ALL") {
            delete newSearchFilter.group_code
        } else {
            newSearchFilter = { ...filter, [field]: value }
        }
        // const newSearchFilter = { ...filter, [field]: value }

        BooksAction.updateBooksFilterAction(dispatch, newSearchFilter)
    }

    const handleSelectDropdown = (field, value) => {
        let newSearchFilter = { ...filter }
        if (field === "group_code" && value === "ALL") {
            delete newSearchFilter.group_code
        } else {
            newSearchFilter = { ...filter, [field]: value }
        }
        // const newSearchFilter = { ...filter, [field]: value }
        setSearchParams(newSearchFilter)
        BooksAction.updateBooksFilterAction(dispatch, newSearchFilter)
        BooksAction.getListBooksAction(dispatch, newSearchFilter)
    }

    const handleSearch = () => {
        setSearchParams(filter)
        BooksAction.getListBooksAction(dispatch, filter)
    }

    const handleNumberItemChange = (newSize, newPage) => {
        console.log(newSize);
        let newSearchFilter = {
            ...filter,
            size: newSize,
            page: 1
        }
        setSearchParams(newSearchFilter)
        BooksAction.updateBooksFilterAction(dispatch, newSearchFilter)
        BooksAction.updateBooksPagination(dispatch, {
            ...pagination,
            size: newSize,
            page: 1
        })
        BooksAction.getListBooksAction(dispatch, newSearchFilter)
    }

    const handleNumberPagehange = (newPage) => {
        let newSearchFilter = {
            ...filter,
            page: newPage
        }
        setSearchParams(newSearchFilter)
        BooksAction.updateBooksFilterAction(dispatch, newSearchFilter)
        BooksAction.updateBooksPagination(dispatch, {
            ...pagination,
            page: newPage
        })
        BooksAction.getListBooksAction(dispatch, newSearchFilter)
    }

    const handleOpenModalCreate = () => {
        setIsHiddenModalCreateBooks(true)
    }

    const onSubmitFormCreate = () => {
        document.getElementById("do-an-form-create-books-button").click();
    }

    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const [codeBooksDelete, setCodeBooksDelete] = useState(null);

    const handleDeleteBooks = (code) => {
        setCodeBooksDelete(code)
        setIsOpenConfirmDialog(true)
    }

    const handleCancelConfirmDialog = () => {
        setCodeBooksDelete(null)
        setIsOpenConfirmDialog(false)
    }

    const handleDeleteConfirmDialog = () => {
        BooksAction.removeBooks(dispatch, codeBooksDelete, filter)
        handleCancelConfirmDialog()
    }

    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)

    const handleEditBooks = (code) => {
        setIdUpdate(code)
        setOpenModalUpdate(true)
    }

    const onSubmitFormUpdate = () => {
        document.getElementById("do-an-form-update-books-button").click();
        
    }

    const onCancelUpdate = () =>{
        setOpenModalUpdate(false)
        setIdUpdate(null)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="do-an__books">
            <div className="do-an__books__image-cover">
                {/* <img className="image-cover" src={imageCover}></img> */}
                <h3 style={{ margin: "10px 0px 10px 10px" }}>Danh mục sách</h3>
            </div>
            <div className="do-an__books__group-search">
                <div className="do-an__books__group-search__filter">
                    <div className="do-an__books__group-search__item">
                        <div className="do-an__books__group-search__item__title">
                            Tên sách:
                        </div>
                        <div className="do-an__books__group-search__item__input-container">
                            <input className="do-an__books__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("name", event.target.value)}
                                value={filter?.name || ""}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </div>
                    </div>
                    <div className="do-an__books__group-search__item">
                        <div className="do-an__books__group-search__item__title">
                            Mã sách:
                        </div>
                        <div className="do-an__books__group-search__item__input-container">
                            <input className="do-an__books__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("code", event.target.value)}
                                value={filter?.code || ""}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </div>
                    </div>
                    <div className="do-an__books__group-search__item">
                        <div className="do-an__books__group-search__item__title">
                            Tác giả:
                        </div>
                        <div className="do-an__books__group-search__item__input-container">
                            <input className="do-an__books__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("author", event.target.value)}
                                value={filter?.author || ""}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </div>
                    </div>
                </div>

                <div className="do-an__books__group-search__filter">
                    <div className="do-an__books__group-search__item">
                        <div className="do-an__books__group-search__item__title">
                            Thể loại:
                        </div>
                        <div className="do-an__books__group-search__item__input-container">
                            <DropDown className="do-an__books__group-search__item__input"
                                listItem={listDefaultDropDown}
                                selected={filter?.group_code || "ALL"}
                                name="group_code"
                                onSelected={handleSelectDropdown}
                            />
                        </div>
                    </div>
                    <div className="do-an__books__group-search__item">
                        <div className="do-an__books__group-search__item__title">
                            Sắp xếp theo:
                        </div>
                        <div className="do-an__books__group-search__item__input-container">
                            <DropDown className="do-an__books__group-search__item__input"
                                listItem={listOrderBy}
                                selected={filter?.order_by || "created_time"}
                                name="order_by"
                                onSelected={handleSelectDropdown}
                            />
                        </div>
                    </div>
                    <div className="do-an__books__group-search__item">
                        <div className="do-an__books__group-search__item__title">
                            Thứ tự:
                        </div>
                        <div className="do-an__books__group-search__item__input-container">
                            <DropDown className="do-an__books__group-search__item__input"
                                listItem={listOrder}
                                selected={filter?.order || -1}
                                name="order"
                                onSelected={handleSelectDropdown}
                            />
                        </div>
                    </div>
                </div>
                <div className="do-an__books__group-search__button-search">
                    <button className="button-search" onClick={handleSearch}>Tìm kiếm</button>
                </div>

            </div>

            <div className="do-an__books__group-table">
                <div className="do-an__books__group-table__title">
                    <button className="button-create-new" onClick={handleOpenModalCreate}>Thêm mới</button>
                </div>
                <div className="do-an__books__group-table__table-data">
                    <DataTable headerData={columnBooks}
                        tableData={listBooks}
                        onNumberItemChange={handleNumberItemChange}
                        pagination={pagination}
                        onPageChange={handleNumberPagehange}
                    >

                    </DataTable>
                </div>
            </div>
            <Modal
                title="Tạo mới sách"
                width="70%"
                onCancel={onCancel}
                visible={isHiddenModalCreateBooks}
                footer={
                    <div className='do-an__modal__footer'>
                        <Button
                            type={"normal-green"}
                            onClick={onSubmitFormCreate}
                        >
                            Tạo mới
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
                {isHiddenModalCreateBooks && <CreateBooks onCloseModal={onCancel}></CreateBooks>}
            </Modal>

            <Confirm
                title="Xoá sách"
                width="45%"
                visible={isOpenConfirmDialog}
                onCancel={handleCancelConfirmDialog}
                onOk={handleDeleteConfirmDialog}
            >
                <p>Nếu xóa {codeBooksDelete} thì dữ liệu sách sẽ mất hết, xác nhận xóa?</p>
            </Confirm>

            {openModalUpdate &&
                <Modal
                    title="Cập nhật thông tin sách"
                    width="70%"
                    onCancel={onCancelUpdate}
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
                                onClick={onCancelUpdate}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    }
                >
                    <UpdateBooks onCloseModal={onCancelUpdate} codeBooks={idUpdate}>

                    </UpdateBooks>
                </Modal>}
        </div>
    )
}

export default BooksPage;