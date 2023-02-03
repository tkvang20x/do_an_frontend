import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import './DataTable.scss'
import Pagination from "../pagination/Pagination"
import Utils from '../../../../common/utils';
import $ from "jquery"

const defaulPagination =  {
    page: 1,
    size: 5,
    totalPage: 0,
    totalItem: 0,
  }

const DataTable = ({tableData, headerData, pagination, sort, onSort, showPagination = true, onPageChange = Function(), onNumberItemChange = Function(), onClickRow = Function(), rowClassName}) => {
    const [isDecrement, setIsDecrement] = useState(false)
    const [dataView, setDataView] = useState([])
    const [paginationTable, setPaginationTable] = useState(defaulPagination)

    useEffect(() => {
        let newPagination = setPagination();
        setPaginationTable(newPagination)
    },[tableData, pagination])

    // $(document).ready(function () {
    //     Utils.showTooltip()
    // })

    useEffect(() => {
        let newDataView = [...tableData]
        if(tableData && tableData.length > paginationTable.size ) {
            newDataView = tableData?.slice((paginationTable.page - 1)* paginationTable.size, paginationTable.size * paginationTable.page);
        }
        setDataView(newDataView)
    },[paginationTable])


    const setPagination = () => {
        if(pagination) {
            return pagination
        }
        const numberTotalPage = tableData?.length > 0 ? tableData?.length/paginationTable.size : 0
        const numberTotalPageFixed = Math.floor(numberTotalPage)
        return {
            ...paginationTable,
            totalPage: numberTotalPage > numberTotalPageFixed ? numberTotalPageFixed + 1 : numberTotalPageFixed,
            totalItem: tableData?.length || 0,
        }
    }

    const handleOnPageChange = (newPage) => {
        setPaginationTable({...paginationTable, page: newPage})
        onPageChange(newPage)
    }

    const handleNumberItemChange = (newSize, newPage) => {
        const numberTotalPage = tableData?.length > 0 ? tableData?.length/newSize : 0
        const numberTotalPageFixed = Math.floor(numberTotalPage)
        const totalPage = numberTotalPage > numberTotalPageFixed ? numberTotalPageFixed + 1 : numberTotalPageFixed
        setPaginationTable({...paginationTable, size: newSize, page: newPage, totalPage: totalPage})
        onNumberItemChange(newSize, newPage)
    }

    const data = dataView?.map((row, index) => {
        let rowData = [];
        for (let header of headerData) {
            rowData.push({
                key: header.dataIndex,
                value: header.render ? header.render(row[header.dataIndex], row): row[header.dataIndex],
                className: header?.className ? header?.className : "",
                titleClassName: header?.titleClassName ? header?.titleClassName : "",
                properties: header?.propertiesRow ? header?.propertiesRow(row) : {}
            });
        }
        return (
            <tr className={(rowClassName) ? rowClassName(row) : ""} key={index} onClick={(e) => {onClickRow(row, e)}}
            >
                {paginationTable ? <td>{(paginationTable.page - 1) * paginationTable.size + index + 1}</td>:
                              <td>{index + 1}</td>}
                {rowData.map((item, indexItem) => {
                        return (<td key={indexItem} className={item.className} {...item.properties}>
                            {item.value}
                        </td>)
                    }
                )}
            </tr>
        )
    })

    // Show a spinner while the profile is loading

    const handleSort = (field, value) => {
        if (sort && field === "Ngày tạo") {
            setIsDecrement(value)

            const elements = document.getElementsByClassName("table-container__table__header");
            for (let element of elements) {
                const title = element.childNodes[0]
                const buttonSort = element.childNodes[1]
                buttonSort.classList.add("table-container__hidden")
                if (title.textContent === field && title.id != "table-container-no") {
                    buttonSort.classList.remove("table-container__hidden")
                    if (onSort) {
                        onSort(field, value ? "desc" : "asc")
                    }
                }
            }
        }
    }

    return (
        <div className='table-container'>
            <div className='table-container__content'>
            <table className='table-container__table'>
                <thead>
                <tr>
                    <th style={{width:"5%"}}>
                        <div className='table-container__table__header'>
                            <div id="table-container-no" className='table-container__table__header__title'>STT</div>
                            <div className='table-container__table__header__btn-sort table-container__hidden'>
                                <FontAwesomeIcon icon={isDecrement ? faAngleDown : faAngleUp}/>
                            </div>
                        </div>
                    </th>
                    {headerData.map((col, index) => (
                        <th style={{width: col.width}} key={index}>
                            <div className={`table-container__table__header ${col.titleClassName ? col.titleClassName : ""}`}
                                 onClick={() => handleSort(col.title, !isDecrement)}>
                                <div className='table-container__table__header__title'>{col.title}</div>
                                {<div className='table-container__table__header__btn-sort table-container__hidden'>
                                    <FontAwesomeIcon icon={isDecrement ? faAngleDown : faAngleUp}/>
                                </div>}
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <tbody>
                    {(tableData && tableData.length >= 1) && data}
                    </tbody>
                </React.Suspense>

            </table>
            </div>
            {(!tableData || tableData.length < 1) &&
            <div className='empty'>
                <div className='logo'></div>
                <div className='text'>Không có dữ liệu</div>
            </div>
            }
            {showPagination && <Pagination
                pagination={paginationTable}
                onPageChange={handleOnPageChange}
                onNumberItemChange={handleNumberItemChange}
            ></Pagination>}
        </div>
    )
}

DataTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headerData: PropTypes.arrayOf(PropTypes.object).isRequired,
    onPageChange: PropTypes.func,
    onNumberItemChange: PropTypes.func,
    pagination: PropTypes.object,
    sort: PropTypes.bool,
    onSort: PropTypes.func,
    showPagination: PropTypes.bool,
}

export default DataTable