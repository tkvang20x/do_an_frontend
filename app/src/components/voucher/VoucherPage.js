import React, { useEffect, useState } from 'react';
import './VoucherPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../share/ecm-base/components/data-table/DataTable";
import VoucherAction from "../../redux/action/VoucherAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import DropDown from '../../share/ecm-base/components/dropdown-v2/DropDown';
import Modal from '../../share/ecm-base/components/modal/Modal';
import Button from '../../share/ecm-base/components/button/Button';
import { ListButton, ListButtonVoucher } from '../../common/utils';
import ConstAPI from '../../common/const';
import Confirm from '../../share/ecm-base/components/confirm/Confirm';

const VoucherPage = ({ prefixPath }) => {


    const columnVoucher = [
        {
            title: "Mã thẻ mượn",
            dataIndex: "voucher_id",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Thời gian mượn",
            dataIndex: "start_date",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Hạn trả",
            dataIndex: "due_date",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Người duyệt",
            dataIndex: "created_by",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "20%"
        },
        {
            title: "Số lượng sách mượn",
            dataIndex: "books_borrowed",
            render: (text) => {
                return <span>{text.length}</span>
            },
            width: "20%"
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

    let listStatus = [
        {
            title: "Tất cả trạng thái",
            value: "ALL"
        },
        {
            title: "Chờ duyệt",
            value: "WAITING_CONFIRM"
        },
        {
            title: "Đã duyệt",
            value: "CONFIRMED"
        },
        {
            title: "Đã trả",
            value: "PAYED"
        },
        {
            title: "Đến hạn trả",
            value: "EXPIRED"
        },
        {
            title: "Hủy",
            value: "CANCELLED"
        },
    ]

    var initPagingFilter = {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: -1,
    };

    const listVoucher = useSelector(state => state.voucherReducer.listVoucher)
    const filter = useSelector(state => state.voucherReducer.paginationFilter)
    const pagination = useSelector(state => state.voucherReducer.pagination)

    const [searchParams, setSearchParams] = useSearchParams({});
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [isHiddenModalCreateVoucher, setIsHiddenModalCreateVoucher] = useState(false)

    useEffect(() => {
        let urlParams = { ...initPagingFilter }
        if (searchParams.get('voucher_id')) {
            urlParams["voucher_id"] = searchParams.get('voucher_id')
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
        // if (searchParams.get('manager_id')) {
        //     urlParams["manager_id"] = searchParams.get('manager_id')
        // }
        if (searchParams.get('status_voucher')) {
            urlParams["status_voucher"] = searchParams.get('status_voucher')
        }
        if (searchParams.get('start_date')) {
            urlParams["start_date"] = searchParams.get('start_date')
        }
        if (searchParams.get('due_date')) {
            urlParams["due_date"] = searchParams.get('due_date')
        }
        setSearchParams(urlParams)
        VoucherAction.updateVoucherFilterAction(dispatch, urlParams)
        VoucherAction.updateVoucherPagination(dispatch, {
            ...pagination,
            page: urlParams.page,
            size: urlParams.size
        })
        VoucherAction.getListVoucherAction(dispatch, urlParams)
    }, [])

    const onCancel = () => {
        setIsHiddenModalCreateVoucher(!isHiddenModalCreateVoucher)
    }


    const handleChangeInputSearch = (field, value) => {
        let newSearchFilter = { ...filter ,[field]: value }
        console.log(newSearchFilter);
        // const newSearchFilter = { ...filter, [field]: value }

        VoucherAction.updateVoucherFilterAction(dispatch, newSearchFilter)
    }

    const handleSearch = () => {
        setSearchParams(filter)
        VoucherAction.getListVoucherAction(dispatch, filter)
    }

    const handleNumberItemChange = (newSize, newPage) => {
        console.log(newSize);
        let newSearchFilter = {
            ...filter,
            size: newSize,
            page: 1
        }
        setSearchParams(newSearchFilter)
        VoucherAction.updateVoucherFilterAction(dispatch, newSearchFilter)
        VoucherAction.updateVoucherPagination(dispatch, {
            ...pagination,
            size: newSize,
            page: 1
        })
        VoucherAction.getListVoucherAction(dispatch, newSearchFilter)
    }

    const handleNumberPagehange = (newPage) => {
        let newSearchFilter = {
            ...filter,
            page: newPage
        }
        setSearchParams(newSearchFilter)
        VoucherAction.updateVoucherFilterAction(dispatch, newSearchFilter)
        VoucherAction.updateVoucherPagination(dispatch, {
            ...pagination,
            page: newPage
        })
        VoucherAction.getListVoucherAction(dispatch, newSearchFilter)
    }

    const handleOpenPageCreate = () => {
        navigate(`${prefixPath}/manager/voucher/create`)
    }

    const onSubmitFormCreate = () => {
        document.getElementById("do-an-form-create-voucher-button").click();
    }

    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const [codeVoucherDelete, setCodeVoucherDelete] = useState(null);

    const handleDeleteVoucher = (code) => {
        setCodeVoucherDelete(code)
        setIsOpenConfirmDialog(true)
    }

    const handleCancelConfirmDialog = () => {
        setCodeVoucherDelete(null)
        setIsOpenConfirmDialog(false)
    }

    const handleDeleteConfirmDialog = () => {
        VoucherAction.removeVoucher(dispatch, codeVoucherDelete, filter)
        handleCancelConfirmDialog()
    }

    return (
        <div className="do-an__voucher">
            <div className="do-an__voucher__image-cover">
                {/* <img className="image-cover" src={imageCover}></img> */}
                <h3 style={{ margin: "10px 0px 10px 10px" }}>Danh sách phiếu mượn</h3>
            </div>
            <div className="do-an__voucher__group-search">
                <div className="do-an__voucher__group-search__filter">
                    <div className="do-an__voucher__group-search__item">
                        <div className="do-an__voucher__group-search__item__title">
                            Mã phiếu mượn:
                        </div>
                        <div className="do-an__voucher__group-search__item__input-container">
                            <input className="do-an__voucher__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("voucher_id", event.target.value)}
                                value={filter?.name || ""}
                            />
                        </div>
                    </div>
                    <div className="do-an__voucher__group-search__item">
                        <div className="do-an__voucher__group-search__item__title">
                            Tên người dùng:
                        </div>
                        <div className="do-an__voucher__group-search__item__input-container">
                            <input className="do-an__voucher__group-search__item__input"
                                onChange={(event) => handleChangeInputSearch("user_id", event.target.value)}
                                value={filter?.user_id || ""}
                            />
                        </div>
                    </div>
                    <div className="do-an__voucher__group-search__item">
                        <div className="do-an__voucher__group-search__item__title">
                            Sắp xếp theo:
                        </div>
                        <div className="do-an__voucher__group-search__item__input-container">
                            <DropDown className="do-an__voucher__group-search__item__input"
                                listItem={listOrderBy}
                                selected={filter?.order_by || "created_time"}
                                name="order_by"
                                onSelected={handleChangeInputSearch}
                            />
                        </div>
                    </div>
                    <div className="do-an__voucher__group-search__item">
                        <div className="do-an__voucher__group-search__item__title">
                            Thứ tự:
                        </div>
                        <div className="do-an__voucher__group-search__item__input-container">
                            <DropDown className="do-an__voucher__group-search__item__input"
                                listItem={listOrder}
                                selected={filter?.order || -1}
                                name="order"
                                onSelected={handleChangeInputSearch}
                            />
                        </div>
                    </div>
                    <div className="do-an__voucher__group-search__item">
                        <div className="do-an__voucher__group-search__item__title">
                            Trạng thái thẻ:
                        </div>
                        <div className="do-an__voucher__group-search__item__input-container">
                            <DropDown className="do-an__voucher__group-search__item__input"
                                listItem={listStatus}
                                selected={filter?.status_voucher || "ALL"}
                                name="status_voucher"
                                onSelected={handleChangeInputSearch}
                            />
                        </div>
                    </div>
                    <div className="do-an__voucher__group-search__item">
                        <div className="do-an__voucher__group-search__item__title">
                            Thời gian:
                        </div>
                        <div className="do-an__voucher__group-search__item__input-container">
                            <input className="do-an__voucher__group-search__item__input"
                            />
                        </div>
                    </div>
                </div>
                <div className="do-an__voucher__group-search__button-search">
                    <button className="button-search" onClick={handleSearch}>Tìm kiếm</button>
                </div>

            </div>

            <div className="do-an__voucher__group-table">
                <div className="do-an__voucher__group-table__title">
                    <button className="button-create-new" onClick={handleOpenPageCreate}>Thêm mới</button>
                </div>
                <div className="do-an__voucher__group-table__table-data">
                    <DataTable headerData={columnVoucher}
                        tableData={listVoucher} >
                    </DataTable>
                </div>
            </div>
            {/* <Confirm
                title="Xoá người dùng"
                width="45%"
                visible={isOpenConfirmDialog}
                onCancel={handleCancelConfirmDialog}
                onOk={handleDeleteConfirmDialog}
            >
                <p>Nếu xóa {codeVoucherDelete} thì dữ liệu thông tin và mượn sách của người dùng sẽ mất hết, xác nhận xóa?</p>
            </Confirm> */}
        </div>
    )
}

export default VoucherPage;