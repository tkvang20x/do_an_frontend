import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './MenuProject.scss'

const MenuProject = ({ prefixPath }) => {

    const [menus, setMenus] = useState([])
    const [isActive, setIsActive] = useState()
    const decode = useSelector(state => state.loginReducer.dataToken)
    
    useEffect(() => {
        if (decode.role === "MANAGER"){
            setMenus([
                {
                    title: "Quản lý sách",
                    url: `${prefixPath}/manager/books/list`,
                    children: []
                },
                {
                    title: "Quản lý bạn đọc",
                    url: `${prefixPath}/manager/user/list`,
                    children: []
                },
                {
                    title: "Quản lý phiếu mượn",
                    url: `${prefixPath}/manager/voucher/list`,
                    children: []
                },
            ])
        }else if(decode.role === "ADMIN"){
            setMenus([
                {
                    title: "Quản lý sách",
                    url: `${prefixPath}/manager/books/list`,
                    children: []
                },
                {
                    title: "Quản lý bạn đọc",
                    url: `${prefixPath}/manager/user/list`,
                    children: []
                },
                {
                    title: "Quản lý phiếu mượn",
                    url: `${prefixPath}/manager/voucher/list`,
                    children: []
                },
                {
                    title: "Quản lý nhân viên",
                    url: `${prefixPath}/manager/manager-list`,
                    children: []
                },
            ])
        }
    }, [decode])


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