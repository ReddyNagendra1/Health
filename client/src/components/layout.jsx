import React from "react";
import '../layout.css'
// import { icons } from "antd/es/image/PreviewGroup";
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
function Layout({ children }) {
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: ''

        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: ''
        },
        {
            name: 'profile',
            path: '/profile',
            icon: ''
        },
        {
            name: 'Logout',
            path: 'Logout',
            icon: '',
        },
    ];

    const menuToBeRendered = userMenu

    return (
        <div className="main">
            <div className="flexlayout">
                <div className="sidebar">
                    <div className="user-name">
                        <Link className="anchor" to="/profile">{user?.name}</Link>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (<div key={menu.path} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>);
                        })}
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        <div className="title">
                            HealthCare
                        </div>

                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Layout;

