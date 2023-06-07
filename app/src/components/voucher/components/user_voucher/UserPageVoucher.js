import React, { useEffect, useState } from 'react';
import './UserPageVoucher.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../../../share/ecm-base/components/data-table/DataTable";
import UserAction from "../../../../redux/action/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, Link } from 'react-router-dom';
import DropDown from '../../../../share/ecm-base/components/dropdown-v2/DropDown';
import ConstAPI from '../../../../common/const';

const UserPageVoucher = ({ prefixPath, handleSelectUser }) => {


    const columnUser = [
        {
            title: "Mã người dùng",
            dataIndex: "code",
            render: (text) => {
                return <span 
                onClick={() => handleSelectUser(text)}
                style={{textDecoration:"underline", color:"#141ed2", cursor:"pointer"}}>{text}</span>;
            },
            width: "15%"
        },
        {
            title: "Tên người dùng",
            dataIndex: "name",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Ngày sinh",
            dataIndex: "date_of_birth",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "10%"
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "10%"
        },
        {
            title: "Khóa",
            dataIndex: "course",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "10%"
        },
        {
            title: "Thời gian tạo",
            dataIndex: "created_time",
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
        {
            title: "Tên",
            value: "name"
        },
    ]

    var initPagingFilter = {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: -1,
    };

    const listUser = useSelector(state => state.userReducer.listUser)
    const filter = useSelector(state => state.userReducer.paginationFilter)
    const pagination = useSelector(state => state.userReducer.pagination)

    const [searchParams, setSearchParams] = useSearchParams({});
    const dispatch = useDispatch();

    useEffect(() => {
        // let urlParams = { ...initPagingFilter }
        // if (searchParams.get('name')) {
        //     urlParams["name"] = searchParams.get('name')
        // }
        // if (searchParams.get('code')) {
        //     urlParams["code"] = searchParams.get('code')
        // }
        // if (searchParams.get('page')) {
        //     urlParams["page"] = parseInt(searchParams.get('page'))
        // }
        // if (searchParams.get('size')) {
        //     urlParams["size"] = parseInt(searchParams.get('size'))
        // }
        // if (searchParams.get('order_by')) {
        //     urlParams["order_by"] = searchParams.get('order_by')
        // }
        // if (searchParams.get('order')) {
        //     urlParams["order"] = parseInt(searchParams.get('order'))
        // }

        // setSearchParams(urlParams)
        UserAction.updateUserFilterAction(dispatch, initPagingFilter)
        UserAction.updateUserPagination(dispatch, {
            ...pagination,
            page: initPagingFilter.page,
            size: initPagingFilter.size
        })
        UserAction.getListUserAction(dispatch, initPagingFilter)
    }, [])



    const handleChangeInputSearch = (field, value) => {
        let newSearchFilter = { ...filter ,[field]: value }
        // const newSearchFilter = { ...filter, [field]: value }

        UserAction.updateUserFilterAction(dispatch, newSearchFilter)
    }

    const handleChangeDropdownSearch = (field, value) => {
        let newSearchFilter = { ...filter ,[field]: value }
        // const newSearchFilter = { ...filter, [field]: value }

        UserAction.updateUserFilterAction(dispatch, newSearchFilter)
        UserAction.getListUserAction(dispatch, newSearchFilter)
    }

    const handleSearch = () => {
        setSearchParams(filter)
        UserAction.getListUserAction(dispatch, filter)
    }

    const handleNumberItemChange = (newSize, newPage) => {
        let newSearchFilter = {
            ...filter,
            size: newSize,
            page: 1
        }
        // setSearchParams(newSearchFilter)
        UserAction.updateUserFilterAction(dispatch, newSearchFilter)
        UserAction.updateUserPagination(dispatch, {
            ...pagination,
            size: newSize,
            page: 1
        })
        UserAction.getListUserAction(dispatch, newSearchFilter)
    }

    const handleNumberPagehange = (newPage) => {
        let newSearchFilter = {
            ...filter,
            page: newPage
        }
        // setSearchParams(newSearchFilter)
        UserAction.updateUserFilterAction(dispatch, newSearchFilter)
        UserAction.updateUserPagination(dispatch, {
            ...pagination,
            page: newPage
        })
        UserAction.getListUserAction(dispatch, newSearchFilter)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="do-an__user">
            <div className="do-an__user__image-cover">
                {/* <img className="image-cover" src={imageCover}></img> */}
                <h3 style={{ margin: "10px 0px 10px 10px" }}>Danh sách người dùng</h3>
            </div>
            <div className="do-an__user__group-search">
                <div className="do-an__user__group-search__filter">
                    <div className="do-an__user__group-search__item">
                        <div className="do-an__user__group-search__item__title">
                            Tên người dùng:
                        </div>
                        <div className="do-an__user__group-search__item__input-container">
                            <input className="do-an__user__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("name", event.target.value)}
                                value={filter?.name || ""}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </div>
                    </div>
                    <div className="do-an__user__group-search__item">
                        <div className="do-an__user__group-search__item__title">
                            Mã người dùng:
                        </div>
                        <div className="do-an__user__group-search__item__input-container">
                            <input className="do-an__user__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("code", event.target.value)}
                                value={filter?.code || ""}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </div>
                    </div>
                    <div className="do-an__user__group-search__item">
                        <div className="do-an__user__group-search__item__title">
                            Sắp xếp theo:
                        </div>
                        <div className="do-an__user__group-search__item__input-container">
                            <DropDown className="do-an__user__group-search__item__input"
                                listItem={listOrderBy}
                                selected={filter?.order_by || "created_time"}
                                name="order_by"
                                onSelected={handleChangeDropdownSearch}
                            />
                        </div>
                    </div>
                    <div className="do-an__user__group-search__item">
                        <div className="do-an__user__group-search__item__title">
                            Thứ tự:
                        </div>
                        <div className="do-an__user__group-search__item__input-container">
                            <DropDown className="do-an__user__group-search__item__input"
                                listItem={listOrder}
                                selected={filter?.order || -1}
                                name="order"
                                onSelected={handleChangeDropdownSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="do-an__user__group-search__button-search">
                    <button className="button-search" onClick={handleSearch}>Tìm kiếm</button>
                </div>

            </div>

            <div className="do-an__user__group-table">
                <div className="do-an__user__group-table__table-data">
                    <DataTable headerData={columnUser}
                        tableData={listUser}
                        onNumberItemChange={handleNumberItemChange}
                        pagination={pagination}
                        onPageChange={handleNumberPagehange}
                    >

                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default UserPageVoucher;