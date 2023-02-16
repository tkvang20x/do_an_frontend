import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './MenuProject.scss'

const MenuProject = ({ prefixPath }) => {

    const [isActive, setIsActive] = useState()
    const menus = [
        {
            title: "Quản lý sách",
            url: `${prefixPath}/manager/books/list`,
            children: [
                // {
                //     title: "Thêm sách",
                //     url: `${prefixPath}/project/${projectRowId}/detail`,
                //     children: null
                // },
                // {
                //     title: "Dataset",
                //     url: `${prefixPath}/project/${projectRowId}/list-dataset`,
                //     children: null
                // },
            ]
        },
        {
            title: "Quản lý khách hàng",
            url: `${prefixPath}/manager/user/list`,
            children: []
        },
        {
            title: "Quản lý phiếu mượn",
            url: `${prefixPath}/manager/voucher/list`,
            children: []
        },
    ]


    const handleChangeURL = (url) => {
        setIsActive(url)
        }

    const createMenu = (listMenu) => {
        return (
            <ul className="ocr-designer__menu-project__ul-type-square">
                {listMenu?.map((menuItem, index) => {
                    let dataHtml = ""
                    if (menuItem.children && menuItem.children.length > 0) {
                        dataHtml = createMenu(menuItem.children)
                    }
                    return <div key={index}>
                        <li className={`ocr-designer__menu-project__li ${isActive === menuItem.url ? "ocr-designer__menu-project__active" : ""}`}>
                            {menuItem.url ? <Link to={menuItem.url}
                                onClick={(event) => handleChangeURL(menuItem.url)}
                            >
                                {menuItem.title}
                            </Link> : menuItem.title}
                        </li>
                        {dataHtml}
                    </div>
                })}
            </ul>
        )
    }

    const beautifyName = (nameProject) => {
        if (nameProject?.length > 40) {
            return nameProject.slice(0, 40).trim() + "..."
        }

        return nameProject
    }

    return (
        <div className='ocr-designer__menu-project'>
            {/* <div className='ocr-designer__menu-project__title'>
                {beautifyName(projectDetail?.name)}
            </div> */}
            <div className='ocr-designer__menu-project__menu'>
                {
                    createMenu(menus)
                }
            </div>
        </div>
    )
}

export default MenuProject