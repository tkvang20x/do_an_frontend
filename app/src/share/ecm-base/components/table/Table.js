import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import './Table.scss'

const Table = ({ tableData, headerData, pagination, sort, onSort, rowClassName, className = "", isScroll = false }) => {
    const [isDecrement, setIsDecrement] = useState(false)

    const data = tableData?.map((row, index) => {
        let rowData = [];
        let i = 0;
        for (let key in headerData) {
            rowData.push({
                key: headerData[i].dataIndex,
                value: headerData[i].render(row[headerData[i].dataIndex], row),
                className: headerData[i]?.className ? headerData[i]?.className : "",
                titleClassName: headerData[i]?.titleClassName ? headerData[i]?.titleClassName : "",
                width: headerData[i]?.width
            });
            i++;
        }
        return (
            <tr key={index} className={rowClassName ? rowClassName(row) : ''}>
                {pagination ? <td>{(pagination.page - 1) * pagination.size + index + 1}</td> :
                    <td style={{width:"5%"}}>{index + 1}</td>}
                {rowData.map((dataR, indexData) => {
                    return (<td style={{width: dataR?.width}} key={indexData} data-heading={dataR.key} className={dataR.className}>
                        {dataR.value}
                    </td>)
                }
                )}
            </tr>
        )
    })

    useEffect(() => {
        if (sort && pagination && pagination?.order) {
            setIsDecrement(pagination.order === -1 ? false : true)
        }
    }, [sort, pagination])

    // Show a spinner while the profile is loading

    const handleSort = (field, value) => {
        if (sort && field === "Ngày tạo") {
            setIsDecrement(value)
            var elements = document.getElementsByClassName("table-container__table__header");
            for (let element of elements) {
                var title = element.childNodes[0]
                var buttonSort = element.childNodes[1]
                buttonSort.classList.add("table-container__hidden")
                if (title.textContent === field && title.id !== "table-container-no") {
                    buttonSort.classList.remove("table-container__hidden")
                    if (onSort) {
                        onSort(value ? "acs" : "desc")
                    }
                }
            }
        }
    }

    return (
        <div className={`table-container ${className}`}>
            <table className={`table-container__table ${isScroll ? "table-container__table__scroll" : ""}`}>
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>
                            <div className='table-container__table__header'>
                                <div id="table-container-no" className='table-container__table__header__title'>STT</div>
                                <div className='table-container__table__header__btn-sort table-container__hidden'>
                                    <FontAwesomeIcon icon={isDecrement ? faAngleDown : faAngleUp} />
                                </div>
                            </div>
                        </th>
                        {headerData.map((col, index) => (
                            <th style={{ width: col.width }} key={index}>
                                <div className={`table-container__table__header ${col.titleClassName ? col.titleClassName : ""}`}
                                    onClick={() => handleSort(col.title, !isDecrement)}>
                                    <div className='table-container__table__header__title'>{col.title}</div>
                                    {<div
                                        className={`table-container__table__header__btn-sort ${col.title === "Ngày tạo" && sort ? "" : "table-container__hidden"}`}>
                                        <FontAwesomeIcon icon={isDecrement ? faAngleUp : faAngleDown} />
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
            {(!tableData || tableData.length < 1) &&
                <div className='empty'>
                    <div className='logo'></div>
                    <div className='text'>Không có dữ liệu</div>
                </div>
            }
        </div>
    )
}

Table.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headerData: PropTypes.arrayOf(PropTypes.object).isRequired,
    pagination: PropTypes.object,
    sort: PropTypes.bool,
    onSort: PropTypes.func
}

export default Table