import React, { useEffect, useState } from 'react';
import './ManagerPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../share/ecm-base/components/data-table/DataTable";
import ManagerAction from "../../redux/action/ManagerAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, Link } from 'react-router-dom';
import DropDown from '../../share/ecm-base/components/dropdown-v2/DropDown';
import Modal from '../../share/ecm-base/components/modal/Modal';
import Button from '../../share/ecm-base/components/button/Button';
import { ListButton, ListButtonUser } from '../../common/utils';
import ConstAPI from '../../common/const';
import Confirm from '../../share/ecm-base/components/confirm/Confirm';
import CreateManager from './create-manager/CreateManager';
import DetailManager from './get-detail-manager/DetailManager';

const ManagerPage = ({ prefixPath }) => {


    const columnManager = [
        {
            title: "Mã quản lý",
            dataIndex: "code",
            render: (text, index) => {
                return <span style={{textDecoration:"underline", color:"#141ed2", cursor:"pointer"}} onClick={() => handleOpenModalDetail(text)}>{text}</span>;
            },
            width: "15%"
        },
        {
            title: "Tên quản lý",
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
                    <ListButtonUser
                        editDisable = {true}
                        onRemoveAction={() => handleDeleteManager(code)}
                        removeButtonName="btnDeleteManager"
                    ></ListButtonUser>
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

    const listManager = useSelector(state => state.managerReducer.listManager)
    const filter = useSelector(state => state.managerReducer.paginationFilter)
    const pagination = useSelector(state => state.managerReducer.pagination)

    const [searchParams, setSearchParams] = useSearchParams({});
    const dispatch = useDispatch();

    const [isHiddenModalCreateManager, setIsHiddenModalCreateManager] = useState(false)

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
        ManagerAction.updateManagerFilterAction(dispatch, urlParams)
        ManagerAction.updateManagerPagination(dispatch, {
            ...pagination,
            page: urlParams.page,
            size: urlParams.size
        })
        ManagerAction.getListManagerAction(dispatch, urlParams)
    }, [])

    const onCancel = () => {
        setIsHiddenModalCreateManager(!isHiddenModalCreateManager)
    }


    const handleChangeInputSearch = (field, value) => {
        let newSearchFilter = { ...filter ,[field]: value }
        console.log(newSearchFilter);
        // const newSearchFilter = { ...filter, [field]: value }

        ManagerAction.updateManagerFilterAction(dispatch, newSearchFilter)
    }

    const handleSearch = () => {
        setSearchParams(filter)
        ManagerAction.getListManagerAction(dispatch, filter)
    }

    const handleNumberItemChange = (newSize, newPage) => {
        console.log(newSize);
        let newSearchFilter = {
            ...filter,
            size: newSize,
            page: 1
        }
        setSearchParams(newSearchFilter)
        ManagerAction.updateManagerFilterAction(dispatch, newSearchFilter)
        ManagerAction.updateManagerPagination(dispatch, {
            ...pagination,
            size: newSize,
            page: 1
        })
        ManagerAction.getListManagerAction(dispatch, newSearchFilter)
    }

    const handleNumberPagehange = (newPage) => {
        let newSearchFilter = {
            ...filter,
            page: newPage
        }
        setSearchParams(newSearchFilter)
        ManagerAction.updateManagerFilterAction(dispatch, newSearchFilter)
        ManagerAction.updateManagerPagination(dispatch, {
            ...pagination,
            page: newPage
        })
        ManagerAction.getListManagerAction(dispatch, newSearchFilter)
    }

    const handleOpenModalCreate = () => {
        setIsHiddenModalCreateManager(true)
    }

    const onSubmitFormCreate = () => {
        document.getElementById("do-an-form-create-manager-button").click();
    }

    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const [codeManagerDelete, setCodeManagerDelete] = useState(null);
    const [detailManager, setDetailManager] = useState(null)
    const [openModalDetail, setOpenModalDetail] = useState(false)

    const handleDeleteManager = (code) => {
        setCodeManagerDelete(code)
        setIsOpenConfirmDialog(true)
    }

    const handleCancelConfirmDialog = () => {
        setCodeManagerDelete(null)
        setIsOpenConfirmDialog(false)
    }

    const handleDeleteConfirmDialog = () => {
        ManagerAction.removeManager(dispatch, codeManagerDelete, filter)
        handleCancelConfirmDialog()
    }

    const handleOpenModalDetail = (item) => {
        setDetailManager(item);
        setOpenModalDetail(true)
    }

    const onCancelDetail = () => {
        setOpenModalDetail(false)
        setDetailManager(null)
    }

    return (
        <div className="do-an__manager">
            <div className="do-an__manager__image-cover">
                {/* <img className="image-cover" src={imageCover}></img> */}
                <h3 style={{ margin: "10px 0px 10px 10px" }}>Danh sách người quản lý</h3>
            </div>
            <div className="do-an__manager__group-search">
                <div className="do-an__manager__group-search__filter">
                    <div className="do-an__manager__group-search__item">
                        <div className="do-an__manager__group-search__item__title">
                            Tên quản lý:
                        </div>
                        <div className="do-an__manager__group-search__item__input-container">
                            <input className="do-an__manager__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("name", event.target.value)}
                                value={filter?.name || ""}
                            />
                        </div>
                    </div>
                    <div className="do-an__manager__group-search__item">
                        <div className="do-an__manager__group-search__item__title">
                            Mã quản lý:
                        </div>
                        <div className="do-an__manager__group-search__item__input-container">
                            <input className="do-an__manager__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("code", event.target.value)}
                                value={filter?.code || ""}
                            />
                        </div>
                    </div>
                    <div className="do-an__manager__group-search__item">
                        <div className="do-an__manager__group-search__item__title">
                            Sắp xếp theo:
                        </div>
                        <div className="do-an__manager__group-search__item__input-container">
                            <DropDown className="do-an__manager__group-search__item__input"
                                listItem={listOrderBy}
                                selected={filter?.order_by || "created_time"}
                                name="order_by"
                                onSelected={handleChangeInputSearch}
                            />
                        </div>
                    </div>
                    <div className="do-an__manager__group-search__item">
                        <div className="do-an__manager__group-search__item__title">
                            Thứ tự:
                        </div>
                        <div className="do-an__manager__group-search__item__input-container">
                            <DropDown className="do-an__manager__group-search__item__input"
                                listItem={listOrder}
                                selected={filter?.order || -1}
                                name="order"
                                onSelected={handleChangeInputSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="do-an__manager__group-search__button-search">
                    <button className="button-search" onClick={handleSearch}>Tìm kiếm</button>
                </div>

            </div>

            <div className="do-an__manager__group-table">
                <div className="do-an__manager__group-table__title">
                    <button className="button-create-new" onClick={handleOpenModalCreate}>Thêm mới</button>
                </div>
                <div className="do-an__manager__group-table__table-data">
                    <DataTable headerData={columnManager}
                        tableData={listManager}
                        onNumberItemChange={handleNumberItemChange}
                        pagination={pagination}
                        onPageChange={handleNumberPagehange}
                    >

                    </DataTable>
                </div>
            </div>
            <Modal
                title="Tạo mới quản lý"
                width="70%"
                onCancel={onCancel}
                visible={isHiddenModalCreateManager}
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
                {isHiddenModalCreateManager && <CreateManager onCloseModal={onCancel}></CreateManager>}
            </Modal>

            <Modal
                title="Chi tiết quản lý"
                width="70%"
                onCancel={onCancelDetail}
                visible={openModalDetail}
                footer={null}
            >
                {openModalDetail && <DetailManager detailManager={detailManager}></DetailManager>}
            </Modal>

            <Confirm
                title="Xoá quản lý"
                width="45%"
                visible={isOpenConfirmDialog}
                onCancel={handleCancelConfirmDialog}
                onOk={handleDeleteConfirmDialog}
            >
                <p>Nếu xóa {codeManagerDelete} thì dữ liệu thông tin của quản lý sẽ mất hết, xác nhận xóa?</p>
            </Confirm>
        </div>
    )
}

export default ManagerPage;