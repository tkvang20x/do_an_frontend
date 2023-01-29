import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import './TableCheckbox.scss'

const TableCheckbox = ({tableData, headerData, pagination, onChange, defaultValue=[]}) => {

    const [listChecked, setListChecked] = useState([])

    useEffect(() => {
        setListChecked(defaultValue)
    }, [defaultValue])

    const checkboxHandle = (event) => {
        const newListChecked = [...listChecked]
        if(event.target.checked) {
            const itemChecked = tableData.find(item => item.id === event.target.value);
            newListChecked.push(itemChecked)
            setListChecked(newListChecked)
            onChange(newListChecked);
            return
        }
        const indexRemove = listChecked.findIndex(item => item.id === event.target.value)
        if(indexRemove > -1) {
            newListChecked.splice(indexRemove, 1);
            setListChecked(newListChecked);
            onChange(newListChecked);
        }

    }
    const checkboxAllHandle = (event) => {
        if(event.target.checked) {
            const newListChecked = tableData.concat(listChecked.filter((item) => {
                return !(tableData.find(value => value.id === item.id));
            }));
            setListChecked(newListChecked)
            onChange(newListChecked);
            return
        }
        const newList = [...listChecked]
        tableData?.forEach((item) => {
            const indexRemove = newList.findIndex(value => value.id === item.id)
            newList.splice(indexRemove, 1);
        })
        setListChecked(newList);
        onChange(newList);

    }

    const checkedInput = (id) => {
        const isCheck =  listChecked.findIndex(item => item.id === id)
        return isCheck > -1 ? true : false
    }

    const checkedAll = () => {
        const listItem = tableData.map(item => (item.id));
        const listItemChecked = listChecked.map(item => (item.id));
        let isCheck = true;
        listItem.forEach(item => {
            if(!(listItemChecked.find(value => value === item))) {
                isCheck = false
                return isCheck;
            }
        });
        return isCheck
    }

    const data = tableData?.map((row, index) => {
        let rowData = [];
        let i = 0;
        for (let key in headerData) {
            rowData.push({
                key: headerData[i].dataIndex,
                value: headerData[i].render(row[headerData[i].dataIndex], row),
                className: headerData[i]?.className ? headerData[i]?.className : "",
                titleClassName: headerData[i]?.titleClassName ? headerData[i]?.titleClassName : ""
            });
            i++;
        }
        return (
            <tr key={index}>
                <td><input checked={checkedInput(row.id)} type="checkbox" value={row.id} id={row.id} onChange={(event) => checkboxHandle(event)} /></td>
                {pagination ? <td>{(pagination.page - 1) * pagination.size + index + 1}</td>:
                              <td>{index + 1}</td>}
                {rowData.map((dataR, indexData) => {
                        return (<td key={indexData} data-heading={dataR.key} className={dataR.className}>
                            {dataR.value}
                        </td>)
                    }
                )}
            </tr>
        )
    })

    return (
        <div className='table-container'>
            <table className='table-container__table-checkbox'>
                <thead>
                <tr>
                    <th style={{width:"5%"}}><input checked={checkedAll()} type="checkbox" onChange={(event) => checkboxAllHandle(event)} /></th>
                    <th style={{width:"5%"}}>
                        <div className='table-container__table-checkbox__header'>
                            <div id="table-container-no" className='table-container__table-checkbox__header__title'>STT</div>
                        </div>
                    </th>
                    {headerData.map((col, index) => (
                        <th style={{width: col.width}} key={index}>
                            <div className={`table-container__table-checkbox__header ${col.titleClassName ? col.titleClassName : ""}`}>
                                <div className='table-container__table-checkbox__header__title'>{col.title}</div>
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

TableCheckbox.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headerData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TableCheckbox