import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './Pagination.scss'
import Toasts from '../toasts/Toasts';
import DropDown from '../dropdown/DropDown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ pagination, onPageChange, onNumberItemChange, placement ="top" }) => {

    const refContainer = useRef(null)
    if (!pagination) {
        pagination = {
            page: 0,
            size: 0,
            totalPage: 0,
            totalItem: 0,
        }
    }
    const { page, size, totalPage, totalItem } = pagination;

    const numberOfPages = []
    for (let i = 1; i <= totalPage; i++) {
        numberOfPages.push(i)
    }

    const [valueGo, setValueGo] = useState('')
    const [currentPage, setCurrentPage] = useState(page)
    const [arrOfCurrentPage, setArrOfCurrentPage] = useState([])
    const [toastList, setToastList] = useState([])
    const [numberShow, setNumberShow] = useState(size)
    const [showTotal, setShowTotal] = useState(true)
    let toastProperties = null

    useEffect(() => {
        const widthPagination = refContainer.current.clientWidth
        if(widthPagination && widthPagination <= 600){
            setShowTotal(false)
        }else {
            setShowTotal(true)
        }
      }, [refContainer])

    useEffect(() => {
        setNumberShow(size)
    }, [size])

    const showToast = (type, title, message) => {
        toastProperties = {
            id: toastList.length + 1,
            type: type,
            title: title,
            message: message
        }
        setToastList([...toastList, toastProperties])
    }

    const listNumberShow = [
       5, 10, 20, 50
    ]

    const leftDots = '... '
    const midDots = '...'
    const rightDots = ' ...'


    useEffect(() => {
        setCurrentPage(pagination.page)
        let tempNumberOfPage = [...arrOfCurrentPage]

        if (numberOfPages.length <= 4 && !showTotal) {
            tempNumberOfPage = numberOfPages
        }else
        if (numberOfPages.length <= 8 && showTotal) {
            tempNumberOfPage = numberOfPages
        }
        else if (currentPage >= 1 && currentPage <= 4 && showTotal) {
            tempNumberOfPage = [1, 2, 3, 4 , 5, midDots, numberOfPages.length]
        }
        else if (currentPage >= 1 && currentPage <= 3 && !showTotal) {
            tempNumberOfPage = [1, 2, 3, midDots, numberOfPages.length]
        }
        else if (currentPage > 4 && currentPage < numberOfPages.length - 2 && showTotal) {
            const sliceLeft = numberOfPages.slice(currentPage - 2, currentPage)
            const sliceRight = numberOfPages.slice(currentPage, currentPage + 1)
            tempNumberOfPage = [1, leftDots, ...sliceLeft, ...sliceRight, rightDots, numberOfPages.length]
        }
        else if (currentPage >= 4 && currentPage < numberOfPages.length - 2 && !showTotal) {
            const sliceLeft = numberOfPages.slice(currentPage - 2, currentPage)
            tempNumberOfPage = [1, leftDots, ...sliceLeft, rightDots, numberOfPages.length]
        }
        else if (currentPage > numberOfPages.length - 3 && showTotal) {
            const slice = numberOfPages.slice(numberOfPages.length - 5, numberOfPages.length)
            tempNumberOfPage = [1, leftDots, ...slice]
        }
        else if (currentPage > numberOfPages.length - 3 && !showTotal) {
            const slice = numberOfPages.slice(numberOfPages.length - 3, numberOfPages.length)
            tempNumberOfPage = [1, leftDots, ...slice]
        }
        else if (currentPage === midDots) {
            setCurrentPage(arrOfCurrentPage[arrOfCurrentPage.length - 3] + 1)
        }
        else if (currentPage === rightDots) {
            setCurrentPage(arrOfCurrentPage[3] + 2)
        }
        else if (currentPage === leftDots) {
            setCurrentPage(arrOfCurrentPage[3] - 2)
        }
        setArrOfCurrentPage(tempNumberOfPage)
    }, [currentPage, pagination])

    function handlePageChange(newPage) {
        setCurrentPage(newPage)
        if (newPage === midDots) {
            newPage = arrOfCurrentPage[arrOfCurrentPage.length - 3] + 1
        }
        else if (newPage === rightDots) {
            newPage = arrOfCurrentPage[3] + 2
        }
        else if (newPage === leftDots) {
            newPage = arrOfCurrentPage[3] - 2
        }
        onPageChange(newPage)
    }

    function handleGo(event) {
        if (event.key == 'Enter') {
            let regex = /^[0-9]+$/
            let value = event.target.value
            if (value.match(regex)) {
                if (value <= 0) {
                    showToast("warning", "Cảnh báo", "Số trang phải lơn hơn 0!")
                } else if (value <= numberOfPages.length) {
                    handlePageChange(Number(value))
                }
                else {
                    showToast("warning", "Cảnh báo", "Số trang này không tồn tại!")
                }
            }
            else {
                showToast("warning", "Cảnh báo", "Xin vui lòng nhập số!")
            }
            setValueGo('')
        }
    }

    function handleChangeInput(event) {
        setValueGo(event.target.value)
    }

    function handleChangeNumberShow(_name, value) {
        const numberTotalPage = totalItem/value
        const numberTotalPageFixed = Math.floor(numberTotalPage) || 0
        const newTotalPage = numberTotalPage > numberTotalPageFixed ? numberTotalPageFixed + 1 : numberTotalPageFixed
        const newPage = page <= newTotalPage ? page: newTotalPage
        setNumberShow(value)
        onNumberItemChange(value, newPage || 1)
    }


    return (
        <div className='paginition-container' ref={refContainer}>
            <div className={`info ${showTotal ? null: "paginition-container__info-view-small"}`}>
                {showTotal && <div className='info__item'>
                    Hiển thị {totalItem > 0 ? (page - 1) * size + 1 : 0}-
                    {((page - 1) * size + size) < totalItem ? ((page - 1) * size + size) : totalItem} của {totalItem}
                </div>
                }
                <DropDown
                    selected={numberShow}
                    listItem={listNumberShow}
                    onSelected={handleChangeNumberShow}
                    placement={placement}

                    className="info__drop-down info__item"
                ></DropDown>
            </div>
            <div className={`handle-box ${showTotal ? null: "paginition-container__handle-box-view-small"}`}>
                <div className='buttons'>
                    <button
                        type="button"
                        disabled={currentPage === 1 || totalPage ===0? true : false}
                        className='button btn-pre-page'
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    {arrOfCurrentPage.map((pageItem, index) => {
                        return (
                            <button
                                type="button"
                                key={index}
                                className={'button' + ((pageItem === currentPage) ? ' button-active' : '')}
                                onClick={() => handlePageChange(pageItem)}
                            >{pageItem}
                            </button>
                        )
                    })}
                    <button
                        type="button"
                        disabled={(currentPage === totalPage || totalPage === 0) ? true : false}
                        className='button btn-next-page'
                        onClick={() => handlePageChange(currentPage + 1)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
                <div className='jump'>
                    <span>Đến:</span>
                    <input disabled={totalPage === 0} onKeyDown={handleGo} type="number" min="1" value={valueGo} onChange={handleChangeInput}></input>
                </div>
            </div>
            <Toasts toastList={toastList} setList={setToastList}></Toasts>
        </div>
    )
}

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
    onNumberItemChange: PropTypes.func,
    placement: PropTypes.string
}

Pagination.defaultProps = {
    onPageChange: null,
}

export default Pagination