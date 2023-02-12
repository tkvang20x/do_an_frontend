import React, { useEffect, useState } from 'react';
import './UserPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../share/ecm-base/components/data-table/DataTable";
import UserAction from "../../redux/action/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, Link } from 'react-router-dom';
import GroupsAction from "../../redux/action/GroupsAction";
import DropDown from '../../share/ecm-base/components/dropdown-v2/DropDown';
import Modal from '../../share/ecm-base/components/modal/Modal';
import Button from '../../share/ecm-base/components/button/Button';
import { ListButton } from '../../common/utils';
import ConstAPI from '../../common/const';
import Confirm from '../../share/ecm-base/components/confirm/Confirm';

const UserPage = ({ prefixPath }) => {


    const columnUser = [
        {
            title: "Mã người dùng",
            dataIndex: "code",
            render: (text) => {
                return <Link to={`${prefixPath}/manager/user/${text}`}>{text}</Link>;
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
        {
            title: "Thao tác",
            dataIndex: "code",
            render: (code) => {
                return (
                    <ListButton
                        onRemoveAction={() => handleDeleteUser(code)}
                        removeButtonName="btnDeleteUser"
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

    const [isHiddenModalCreateUser, setIsHiddenModalCreateUser] = useState(false)

    useEffect(() => {
        let urlParams = { ...initPagingFilter }
        if (searchParams.get('name')) {
            urlParams["name"] = searchParams.get('name')
        }
        if (searchParams.get('code')) {
            urlParams["code"] = searchParams.get('code')
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
        UserAction.updateUserFilterAction(dispatch, urlParams)
        UserAction.updateUserPagination(dispatch, {
            ...pagination,
            page: urlParams.page,
            size: urlParams.size
        })
        UserAction.getListUserAction(dispatch, urlParams)
    }, [])

    const onCancel = () => {
        setIsHiddenModalCreateUser(!isHiddenModalCreateUser)
    }


    const handleChangeInputSearch = (field, value) => {
        let newSearchFilter = { ...filter ,[field]: value }
        console.log(newSearchFilter);
        // const newSearchFilter = { ...filter, [field]: value }

        UserAction.updateUserFilterAction(dispatch, newSearchFilter)
    }

    const handleSearch = () => {
        setSearchParams(filter)
        UserAction.getListUserAction(dispatch, filter)
    }

    const handleNumberItemChange = (newSize, newPage) => {
        console.log(newSize);
        let newSearchFilter = {
            ...filter,
            size: newSize,
            page: 1
        }
        setSearchParams(newSearchFilter)
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
        setSearchParams(newSearchFilter)
        UserAction.updateUserFilterAction(dispatch, newSearchFilter)
        UserAction.updateUserPagination(dispatch, {
            ...pagination,
            page: newPage
        })
        UserAction.getListUserAction(dispatch, newSearchFilter)
    }

    const handleOpenModalCreate = () => {
        setIsHiddenModalCreateUser(true)
    }

    const onSubmitFormCreate = () => {
        document.getElementById("do-an-form-create-User-button").click();
    }

    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const [codeUserDelete, setCodeUserDelete] = useState(null);

    const handleDeleteUser = (code) => {
        setCodeUserDelete(code)
        setIsOpenConfirmDialog(true)
    }

    const handleCancelConfirmDialog = () => {
        setCodeUserDelete(null)
        setIsOpenConfirmDialog(false)
    }

    const handleDeleteConfirmDialog = () => {
        UserAction.removeUser(dispatch, codeUserDelete, filter)
        handleCancelConfirmDialog()
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
                                onSelected={handleChangeInputSearch}
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
                                onSelected={handleChangeInputSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="do-an__user__group-search__button-search">
                    <button className="button-search" onClick={handleSearch}>Tìm kiếm</button>
                </div>

            </div>

            <div className="do-an__user__group-table">
                <div className="do-an__user__group-table__title">
                    <button className="button-create-new" onClick={handleOpenModalCreate}>Thêm mới</button>
                </div>
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
            {/* <Modal
                title="Tạo mới sách"
                width="70%"
                onCancel={onCancel}
                visible={isHiddenModalCreateUser}
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
                {isHiddenModalCreateUser && <CreateUser onCloseModal={onCancel}></CreateUser>}
            </Modal> */}

            <Confirm
                title="Xoá người dùng"
                width="45%"
                visible={isOpenConfirmDialog}
                onCancel={handleCancelConfirmDialog}
                onOk={handleDeleteConfirmDialog}
            >
                <p>Nếu xóa {codeUserDelete} thì dữ liệu thông tin và mượn sách của người dùng sẽ mất hết, xác nhận xóa?</p>
            </Confirm>
        </div>
    )
}

export default UserPage;