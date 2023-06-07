import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './MenuProject.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faTicket, faUserSecret , faBookOpen, faChartSimple} from "@fortawesome/free-solid-svg-icons";

const MenuProject = ({ prefixPath, isExpand }) => {

    const [menus, setMenus] = useState([])
    const [isActive, setIsActive] = useState()
    const decode = useSelector(state => state.loginReducer.dataToken)
    const navigate = useNavigate();

    const location = useLocation()

    useEffect(() => {
        if (decode.role === "MANAGER"){
            setMenus([
                {
                    title: "Quản trị sách",
                    url: `${prefixPath}/manager/books/list`,
                    children: [],
                    icon: faBook
                },
                {
                    title: "Quản trị người dùng",
                    url: `${prefixPath}/manager/user/list`,
                    children: [],
                    icon: faUser
                },
                {
                    title: "Quản trị phiếu mượn",
                    url: `${prefixPath}/manager/voucher/list`,
                    children: [],
                    icon: faTicket
                },
                {
                    title: "Quản trị thể loại",
                    url: `${prefixPath}/manager/group/list`,
                    children: [],
                    icon: faBookOpen
                },
                {
                    title: "Thống kê",
                    url: `${prefixPath}/manager/chart`,
                    children: [],
                    icon: faChartSimple
                },
            ])
        }else if(decode.role === "ADMIN"){
            setMenus([
                {
                    title: "Quản trị sách",
                    url: `${prefixPath}/manager/books/list`,
                    children: [],
                    icon: faBook
                },
                {
                    title: "Quản trị người dùng",
                    url: `${prefixPath}/manager/user/list`,
                    children: [],
                    icon: faUser
                },
                {
                    title: "Quản trị phiếu mượn",
                    url: `${prefixPath}/manager/voucher/list`,
                    children: [],
                    icon: faTicket
                },
                {
                    title: "Quản trị thể loại",
                    url: `${prefixPath}/manager/group/list`,
                    children: [],
                    icon: faBookOpen
                },
                {
                    title: "Quản trị thủ thư",
                    url: `${prefixPath}/manager/manager-list`,
                    children: [],
                    icon: faUserSecret
                },
                {
                    title: "Thống kê",
                    url: `${prefixPath}/manager/chart`,
                    children: [],
                    icon: faChartSimple
                }
            ])
        }
    }, [decode])

    useEffect(() => {
        setIsActive(`${prefixPath}${location?.pathname}`)
    }, [menus])


    const handleChangeURL = (url) => {
        setIsActive(url)
        navigate(url)
        }

    const createMenu = (listMenu) => {
        return (
            <ul className="ocr-designer__menu-project__ul-type-square">
                {listMenu?.map((menuItem, index) => {
                    let dataHtml = ""
                    if (menuItem.children && menuItem.children.length > 0) {
                        dataHtml = createMenu(menuItem.children)
                    }
                    return <div onClick={(event) => handleChangeURL(menuItem.url)} className={`ocr-designer__menu-project__row ${isActive === menuItem.url ? "active-row" : ""} ${isExpand === true ? "" : "row-inexpand" }`} key={index}>
                        <FontAwesomeIcon className='do-an-icon' icon={menuItem?.icon} bounce={isActive === menuItem.url}/>
                        <li className={`ocr-designer__menu-project__li ${isActive === menuItem.url ? "ocr-designer__menu-project__active" : ""} ${isExpand === true ? "" : "li-inexpand" }`}>
                            {menuItem.url ? <Link to={menuItem.url}
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