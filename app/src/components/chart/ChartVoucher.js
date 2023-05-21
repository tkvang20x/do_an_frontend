import React, { useEffect, useState } from 'react';
import DataTable from '../../share/ecm-base/components/data-table/DataTable';
import VoucherAction from '../../redux/action/VoucherAction';
import { Link } from 'react-router-dom';
import './ChartVoucher.scss';
import DropDown from '../../share/ecm-base/components/dropdown-v2/DropDown';
import { useDispatch, useSelector } from 'react-redux';

const ChartVoucher = ({ prefixPath }) => {

    const columnGroup = [
        {
            title: "Mã sách",
            dataIndex: "code_books",
            render: (text) => {
                return <Link to={`${prefixPath}/manager/books/${text}`}>{text}</Link>;
            },
            width: "15%"
        },
        {
            title: "Tên sách",
            dataIndex: "name",
            render: (text) => {
                return <span>{text}</span>
            },
            width: "15%"
        },
        {
            title: "Tên tác giả",
            dataIndex: "author",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "15%"
        },
        {
            title: "Số lượng mượn",
            dataIndex: "count",
            render: (text) => {
                return <span>{text}</span>;
            },
            width: "15%"
        },
    ]

    let listMonth = [
        {
            title: "Tháng 1",
            value: "01"
        },
        {
            title: "Tháng 2",
            value: "02"
        },
        {
            title: "Tháng 3",
            value: "03"
        },
        {
            title: "Tháng 4",
            value: "04"
        },
        {
            title: "Tháng 5",
            value: "05"
        },
        {
            title: "Tháng 6",
            value: "06"
        },
        {
            title: "Tháng 7",
            value: "07"
        },
        {
            title: "Tháng 8",
            value: "08"
        },
        {
            title: "Tháng 9",
            value: "09"
        },
        {
            title: "Tháng 10",
            value: "10"
        },
        {
            title: "Tháng 11",
            value: "11"
        },
        {
            title: "Tháng 10",
            value: "12"
        },
    ]

    let listYear = [
        {
            title: "2023",
            value: "2023"
        }
    ]

    const detailChart = useSelector(state => state.voucherReducer.detailChart)

    console.log(detailChart);


    const [listChart, setListChart] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setMonth("05")
        setYear("2023")
        VoucherAction.getChartVoucher(dispatch, "05", "2023").then(response => {
            setListChart(response.list_books_count)
        })
    }, [])


    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")

    const handleSelectMonth = (field, value) => {
        setMonth(value)
        VoucherAction.getChartVoucher(dispatch, value, year).then(response => {
            setListChart(response.list_books_count)
        })
    }

    const handleSelectYear = (field, value) => {
        setYear(value)
        VoucherAction.getChartVoucher(dispatch, month, value).then(response => {
            setListChart(response.list_books_count)
        })
    }


    return (
        <div className='do-an__chart-voucher'>
            <div className="do-an__chart-voucher__header">
                <h3 style={{ margin: "10px 0px 10px 10px" }}>Thống kê phiếu mượn</h3>
            </div>
            <div className="do-an__chart-voucher__info-chart">
                <div className='do-an__chart-voucher__info-chart__group'>
                    <div className='do-an__chart-voucher__info-chart__group__card card-total'>
                        Tổng số phiếu: {detailChart.total_voucher}
                    </div>
                </div>
                <div className='do-an__chart-voucher__info-chart__group'>
                    <div className='do-an__chart-voucher__info-chart__group__card card-waiting'>
                        Số phiếu đang chờ duyệt: {detailChart.total_waiting}
                    </div>
                    <div className='do-an__chart-voucher__info-chart__group__card card-confirm'>
                        Số phiếu đã duyệt: {detailChart.total_confirm}
                    </div>
                    <div className='do-an__chart-voucher__info-chart__group__card card-payed'>
                        Số phiếu đã trả: {detailChart.total_payed}
                    </div>
                    <div className='do-an__chart-voucher__info-chart__group__card card-expired'>
                        Số phiếu đã quá hạn: {detailChart.total_expired}
                    </div>
                    <div className='do-an__chart-voucher__info-chart__group__card card-cancel'>
                        Số phiếu đã hủy: {detailChart.total_cancel}
                    </div>
                </div>
            </div>
            <div className='do-an__chart-voucher__group-dropdown'>
                <DropDown
                    className={"do-an-chart-dropdown"}
                    listItem={listMonth}
                    selected={month}
                    name={"month"}
                    onSelected={handleSelectMonth}
                >

                </DropDown>

                <DropDown
                    className={"do-an-chart-dropdown"}
                    listItem={listYear}
                    selected={year}
                    name={"year"}
                    onSelected={handleSelectYear}
                >

                </DropDown>
            </div>
            <div className='do-an__chart-voucher__table'>
                <DataTable
                    tableData={listChart}
                    headerData={columnGroup}
                >

                </DataTable>
            </div>
        </div>
    )
}

export default ChartVoucher;