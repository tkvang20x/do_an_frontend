import React, { useEffect, useState } from 'react';
import DataTable from '../../share/ecm-base/components/data-table/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { ListButton, ListButtonUser } from '../../common/utils';
import './GroupPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import GroupsAction from '../../redux/action/GroupsAction';
import { useSearchParams } from 'react-router-dom';
import Modal from '../../share/ecm-base/components/modal/Modal';
import CreateGroup from './create_group/CreateGroup';
import Button from '../../share/ecm-base/components/button/Button';
import UpdateGroup from './update_group/UpdateGroup';
import Confirm from '../../share/ecm-base/components/confirm/Confirm';

var initPagingFilter = {
    page: 1,
    size: 10,
    order_by: "created_time",
    order: -1,
};

const GroupPage = ({ prefixPath }) => {

    const columnGroup = [
        {
            title: "Mã thể loại",
            dataIndex: "group_code",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "15%"
        },
        {
            title: "Tên thể loại",
            dataIndex: "group_name",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Mô tả thể loại",
            dataIndex: "description",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "15%"
        },
        {
            title: "Thao tác",
            dataIndex: "group_code",
            render: (text, index) => {
                return (
                    <ListButton
                        onRemoveAction={() => {handleDeleteGroup(text)}}
                        removeButtonName="btnDeleteUser"
                        onEditAction={() => {handleOpenUpdate(index)}}
                    ></ListButton>
                );
            },
            width: "15%"
        }
    ]

    const listGroup = useSelector(state => state.groupsReducer.listGroups)
    const filter = useSelector(state => state.groupsReducer.paginationFilter)
    const pagination = useSelector(state => state.groupsReducer.pagination)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams({});

    const [openModalCreate, setOpenModalCreate] = useState(false);

    useEffect(() => {

        let urlParams = { ...initPagingFilter }
        if (searchParams.get('group_name')) {
            urlParams["group_name"] = searchParams.get('group_name')
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
        GroupsAction.updateGroupFilterAction(dispatch, urlParams)
        GroupsAction.updateGroupPagination(dispatch, {
            ...pagination,
            page: urlParams.page,
            size: urlParams.size
        })
        GroupsAction.getListGroupsAction(dispatch, urlParams)
    }, [])

    const handleNumberItemChange = (newSize, newPage) => {
        let newSearchFilter = {
            ...filter,
            size: newSize,
            page: 1
        }
        setSearchParams(newSearchFilter)
        GroupsAction.updateGroupFilterAction(dispatch, newSearchFilter)
        GroupsAction.updateGroupPagination(dispatch, {
            ...pagination,
            size: newSize,
            page: 1
        })
        GroupsAction.getListGroupsAction(dispatch, newSearchFilter)
    }

    const handleNumberPagehange = (newPage) => {
        let newSearchFilter = {
            ...filter,
            page: newPage
        }
        setSearchParams(newSearchFilter)
        GroupsAction.updateGroupFilterAction(dispatch, newSearchFilter)
        GroupsAction.updateGroupPagination(dispatch, {
            ...pagination,
            page: newPage
        })
        GroupsAction.getListGroupsAction(dispatch, newSearchFilter)
    }

    const handleChangeInputSearch = (field, value) => {
        let newSearchFilter = { ...filter, [field]: value }

        GroupsAction.updateGroupFilterAction(dispatch, newSearchFilter)
    }

    const handleSearch = () => {
        setSearchParams(filter)
        GroupsAction.getListGroupsAction(dispatch, filter)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    const handleOpenCreate = () => {
        setOpenModalCreate(true)
    }

    const handleCancelCreate = () => {
        setOpenModalCreate(false)
    }

    const onSubmitFormCreate = () => {
        document.getElementById("do-an-form-create-group-button").click();
    }

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    
    const handleOpenUpdate = (index) => {
        setOpenModalUpdate(true)
        setDataUpdate(index)
    }

    const handleCancelUpdate = () => {
        setOpenModalUpdate(false)
    }

    const onSubmitFormUpdate = () => {
        document.getElementById("do-an-form-update-group-button").click();
    }

    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const [codeGroupDelete, setCodeGroupsDelete] = useState(null);

    const handleDeleteGroup = (code) => {
        console.log(code);
        setCodeGroupsDelete(code)
        setIsOpenConfirmDialog(true)
    }

    const handleCancelConfirmDialog = () => {
        setCodeGroupsDelete(null)
        setIsOpenConfirmDialog(false)
    }

    const handleDeleteConfirmDialog = () => {
        GroupsAction.removeGroup(dispatch, codeGroupDelete, filter)
        handleCancelConfirmDialog()
    }
    return (
        <div className='do-an__group'>
            <div className="do-an__group__header">
                <h3 style={{ margin: "10px 0px 10px 10px" }}>Danh sách thể loại</h3>
            </div>

            <div className="do-an__group__group-table">
                <div className="do-an__group__group-table__title">
                    <div className='do-an__group__group-table__title__group-search'>
                        <div className='do-an__group__group-table__title__group-search__input-group'>
                            <span className='do-an__group__group-table__title__group-search__input-group__span'>Tên thể loại:</span>
                            <input className='do-an__group__group-table__title__group-search__input-group__input do-an__input'
                                onChange={(event) => handleChangeInputSearch("group_name", event.target.value)}
                                onKeyDown={(event) => handleKeyDown(event)}
                                value={filter?.group_name || ""}
                            ></input>
                        </div>
                        <div className='button-search-group'>
                            <FontAwesomeIcon icon={faSearch}
                                onClick={(event) => handleSearch()}
                            ></FontAwesomeIcon>
                        </div>
                    </div>
                    <button className="button-create-new" onClick={handleOpenCreate}>Thêm mới</button>
                </div>
                <div className="do-an__group__group-table__table-data">
                    <DataTable headerData={columnGroup}
                        tableData={listGroup}
                        onNumberItemChange={handleNumberItemChange}
                        pagination={pagination}
                        onPageChange={handleNumberPagehange}
                    >
                    </DataTable>
                </div>
            </div>

            {openModalCreate &&
                <Modal
                    title="Tạo mới thể loại"
                    width="50%"
                    onCancel={handleCancelCreate}
                    visible={openModalCreate}
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
                                onClick={handleCancelCreate}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    }
                >
                    <CreateGroup onCloseModal={handleCancelCreate}></CreateGroup>
                </Modal>
            }

            {openModalUpdate &&
                <Modal
                    title="Cập nhật thể loại"
                    width="50%"
                    onCancel={handleCancelUpdate}
                    visible={openModalUpdate}
                    footer={
                        <div className='do-an__modal__footer'>
                            <Button
                                type={"normal-blue"}
                                onClick={onSubmitFormUpdate}
                            >
                                Tạo mới
                            </Button>
                            <Button
                                type={"normal-gray"}
                                onClick={handleCancelUpdate}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    }
                >
                    <UpdateGroup dataUpdate={dataUpdate} onCloseModal={handleCancelUpdate}></UpdateGroup>
                </Modal>
            }

            <Confirm
                title="Xoá thể loại"
                width="45%"
                visible={isOpenConfirmDialog}
                onCancel={handleCancelConfirmDialog}
                onOk={handleDeleteConfirmDialog}
            >
                <p>Xác nhận xóa thể loại {codeGroupDelete}?</p>
            </Confirm>
        </div>
    )
}

export default GroupPage;