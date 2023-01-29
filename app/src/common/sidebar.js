import React from "react";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

function Sidebar() {

    const menuClient = useSelector((state) => state.userReducer.menuClient)

    return (
        <>
            <ul className="navbar-nav bg-gradient-menu sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div>
                        <img className="" src="/img/mb.png" style={{width: 70}} alt=""></img>
                    </div>
                    <div className="sidebar-brand-text mx-1">OCR CENTER WEB</div>
                </Link>
                {/* Divider */}
                <hr className="sidebar-divider my-0"></hr>
                {menuClient?.map((route, i) => (
                    route.parent === true
                        ? <li className="nav-item" key={route.name}>
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target={"#collapseMenu" + i}
                               aria-expanded="true" aria-controls="collapseTwo">
                                <i className={route.icon} style={{fontSize: 18}}></i>
                                <span>{route.name}</span>
                            </a>
                            <div id={"collapseMenu" + i} className="collapse" aria-labelledby="headingTwo"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    {route.child.map((routeChild, z) => (
                                        <Link key={routeChild.name} className="collapse-item" to={routeChild.path}>
                                            <span>{routeChild.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </li>
                        : <li className="nav-item" key={route.name}>
                            <Link className="nav-link" to={route.path}>
                                <i className={route.icon} style={{fontSize: 18}}></i>
                                <span>{route.name}</span>
                            </Link>
                        </li>

                ))}
                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block"></hr>
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        </>
    )
}

export default Sidebar;