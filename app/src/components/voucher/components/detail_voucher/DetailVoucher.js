import React, { useEffect, useState } from "react";

import './DetailVoucher.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBook } from "@fortawesome/free-solid-svg-icons";
import image from '../../../../share/image/123.jpg';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import DropDown from "../../../../share/ecm-base/components/dropdown-v2/DropDown";
import ConstAPI from "../../../../common/const";
import DataTable from "../../../../share/ecm-base/components/data-table/DataTable";
import VoucherAction from "../../../../redux/action/VoucherAction";
import Confirm from "../../../../share/ecm-base/components/confirm/Confirm";


const DetailVoucher = ({ prefixPath }) => {

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
            width: "10%"
        },
        {
            title: "Tên sách",
            dataIndex: "name",
            render: (text, index) => {
                return <span>{index?.books?.name}</span>
            },
            width: "15%"
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            render: (text, index) => {
                return <span>{index?.books?.author}</span>
            },
            width: "20%"
        },
        {
            title: "Ảnh",
            dataIndex: "avatar",
            render: (text, index) => {
                // return <span>{index?.books?.avatar}</span>
                return text !== null ? <img style={{ width: "40px" }} src={`${ConstAPI.BASE_HOST_API}${index?.books?.avatar}`}></img> : <span>Không có avatar</span>;
            },
            width: "20%"
        },
        {
            title: "Mã QR Code",
            dataIndex: "qr_code_data",
            render: (text) => {
                return text !== null ? <img style={{ width: "40px" }} src={`${ConstAPI.BASE_HOST_API}${text}`}></img> : <span>Không có mã QR</span>;
            },
            width: "15%"
        },
    ]

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { voucher_id } = useParams()

    const [statusUpdate, setStatusUpdate] = useState(null);
    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

    const [listBook, setListBook] = useState([])

    const detailVoucher = useSelector(state => state.voucherReducer.detailVoucher)
    const filter = useSelector(state => state.voucherReducer.paginationFilter)


    useEffect(() => {
        VoucherAction.getDetailVoucherAction(dispatch, voucher_id).then(response => {
            setListBook(response?.books_borrowed)
        })
    }, [voucher_id])

    const handleUpdatePage = () => {
        navigate(`${prefixPath}/manager/voucher/${voucher_id}/update`)
    }


    const handleUpdateStatusVoucher = (status_update) => {
        setIsOpenConfirmDialog(true)
        setStatusUpdate(status_update)
    }

    const handleCancelConfirmDialog = () => {
        setIsOpenConfirmDialog(false)
        setStatusUpdate(null)
    }

    const handleUpdateStatus = () => {
        VoucherAction.updateStatusVoucher(dispatch, voucher_id, statusUpdate, filter)

        handleCancelConfirmDialog()

    }

    return (
        <div className='do-an__view-voucher-container'>
            <div className='do-an__view-voucher-container__header'>
                <div className='do-an__view-voucher-container__header__text'>
                    <button
                        className="do-an__view-voucher-container__header__button"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} style={{ height: "22px", marginTop: "5px", marginLeft: "5px" }} />
                    </button>
                    <div className='do-an__view-voucher-container__header__title'>Thông tin chi tiết phiếu mượn</div>
                </div>

                <button
                    className="do-an__view-voucher-container__header__button-edit button-search"
                    style={{ float: "right", margin: "10px" }}
                    onClick={handleUpdatePage}
                    disabled={detailVoucher.status_voucher === "CANCELLED" || detailVoucher.status_voucher === "PAYED"}
                >
                    Chỉnh sửa
                </button>
            </div>
            <div className='do-an__view-voucher-container__info'>
                <div className='do-an__view-voucher-container__info__group-info do-an-view-info-user'>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Tên người dùng:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.name}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Mã người dùng:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.code}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Ngày sinh:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.date_of_birth}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Giới tính:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.gender}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Khóa:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.course}
                        </div>
                    </div>
                </div>

                <div className='do-an__view-voucher-container__info__group-info do-an-view-info-user'>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Đại học:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.university}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Số điện thoại:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.phone}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Email:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.email}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Tài khoản:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.user_name}
                        </div>
                    </div>
                    <div className='do-an__view-voucher-container__info__row'>
                        <div className='do-an__view-voucher-container__info__row__title'>
                            Ngày tạo:
                        </div>
                        <div className='do-an__view-voucher-container__info__row__value'>
                            {detailVoucher?.users?.created_time}
                        </div>
                    </div>
                </div>
                <div className='do-an__view-voucher-container__info__avatar'>
                    <img className="do-an-preview-image" src={`${ConstAPI.BASE_HOST_API}${detailVoucher?.users?.avatar}`}></img>
                </div>
            </div>
            <div className='do-an__view-voucher-container__table'>
                <div className='do-an__view-voucher-container__info'>
                    <div className='do-an__view-voucher-container__info__group-info'>
                        <div className='do-an__view-voucher-container__info__row'>
                            <div className='do-an__view-voucher-container__info__row__title'>
                                Mã phiếu mượn:
                            </div>
                            <div className='do-an__view-voucher-container__info__row__value'>
                                {detailVoucher?.voucher_id}
                            </div>
                        </div>
                        <div className='do-an__view-voucher-container__info__row'>
                            <div className='do-an__view-voucher-container__info__row__title'>
                                Ngày bắt đầu:
                            </div>
                            <div className='do-an__view-voucher-container__info__row__value'>
                                {detailVoucher?.start_date}
                            </div>
                        </div>
                        <div className='do-an__view-voucher-container__info__row'>
                            <div className='do-an__view-voucher-container__info__row__title'>
                                Ngày kết thúc:
                            </div>
                            <div className='do-an__view-voucher-container__info__row__value'>
                                {detailVoucher?.due_date}
                            </div>
                        </div>
                    </div>

                    <div className='do-an__view-voucher-container__info__group-info'>
                        <div className='do-an__view-voucher-container__info__row'>
                            <div className='do-an__view-voucher-container__info__row__title'>
                                Trạng thái:
                            </div>
                            <div className='do-an__view-voucher-container__info__row__value do-an-status-voucher-detail'>
                                <span className="do-an-status-voucher-detail__span">
                                    {detailVoucher?.status_voucher === "WAITING_CONFIRM" && "Chờ xác nhận"}
                                    {detailVoucher?.status_voucher === "CONFIRMED" && "Đã xác nhận"}
                                    {detailVoucher?.status_voucher === "PAYED" && "Đã trả phiếu"}
                                    {detailVoucher?.status_voucher === "EXPIRED" && "Đã hết hạn"}
                                    {detailVoucher?.status_voucher === "CANCELLED" && "Đã hủy"}</span>

                                <div className="do-an-action-list-button" style={{ display: "flex", justifyContent: "space-around" }}>
                                    {detailVoucher?.status_voucher === "WAITING_CONFIRM" && <button className="do-an-status-voucher-CONFIRMED" style={{marginRight:"10px"}} onClick={() => handleUpdateStatusVoucher("WAITING_CONFIRM")}>Xác nhận</button>}
                                    {detailVoucher?.status_voucher === "CONFIRMED" && <button className="do-an-status-voucher-PAYED" style={{marginRight:"10px"}} onClick={() => handleUpdateStatusVoucher("CONFIRMED")}>Trả phiếu</button>}
                                    {detailVoucher?.status_voucher === "EXPIRED" && <button className="do-an-status-voucher-PAYED" style={{marginRight:"10px"}} onClick={() => handleUpdateStatusVoucher("EXPIRED")}>Trả phiếu</button>}
                                    {detailVoucher?.status_voucher !== "CANCELLED" && <button className="do-an-status-voucher-CANCELLED" style={{marginRight:"10px"}} onClick={() => handleUpdateStatusVoucher("CANCELLED")}>Hủy</button>}
                                </div>
                            </div>
                        </div>
                        <div className='do-an__view-voucher-container__info__row'>
                            <div className='do-an__view-voucher-container__info__row__title'>
                                Người duyệt:
                            </div>
                            <div className='do-an__view-voucher-container__info__row__value'>
                                {detailVoucher?.manager_name}
                            </div>
                        </div>
                        <div className='do-an__view-voucher-container__info__row'>
                            <div className='do-an__view-voucher-container__info__row__title'>
                                Ghi chú:
                            </div>
                            <div className='do-an__view-voucher-container__info__row__value'>
                                {detailVoucher?.description}
                            </div>
                        </div>

                    </div>
                    {/* <div className='do-an__view-voucher-container__info__user-voucher-status'> */}
                    {/* <img className="do-an-preview-image" src={image}></img> */}

                    {/* <div className="do-an__view-voucher-container__info__user-voucher-status__history-voucher">
                            <div className="do-an__view-voucher-container__info__user-voucher-status__history-voucher__icon">
                                <FontAwesomeIcon icon={faBook} style={{ height: "50px", color: "#00089b" }} />
                            </div>
                            <div className="do-an__view-voucher-container__info__user-voucher-status__history-voucher__infor">
                                <span>Tổng số phiếu mượn: 10</span>
                                <span>Quá hạn: 1</span>
                                <span>Đã trả: 9</span>
                            </div>
                        </div>
                    </div> */}
                </div>
                <DataTable headerData={columnBook}
                    tableData={listBook}
                >
                </DataTable>
            </div>

            <Confirm
                title="Cập nhật phiếu mượn"
                width="45%"
                visible={isOpenConfirmDialog}
                onCancel={handleCancelConfirmDialog}
                onOk={handleUpdateStatus}
            >
                <p>Xác nhận cập nhật trạng thái phiếu mượn: {voucher_id}?</p>
            </Confirm>
        </div>
    )
}

export default DetailVoucher;