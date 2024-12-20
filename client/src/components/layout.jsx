import React from "react";
import '../layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Badge } from "antd";
import api from '../config/api'

function Layout({ children }) {
    const { user } = useSelector((state) => state.user);
    // console.log(user);
    const location = useLocation();
    const navigate = useNavigate();
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-2-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-line'
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "ri-hospital-line",
        }


    ];

    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Users",
            path: "/admin/userslist",
            icon: "ri-user-line",
        },
        {
            name: "Doctors",
            path: "/admin/doctorslist",
            icon: "ri-user-star-line",
        },
        // {
        //     name: "Profile",
        //     path: "/profile",
        //     icon: "ri-user-line",
        // },
    ];

    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Appointments",
            path: "/doctor/appointments",
            icon: "ri-file-list-line",
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "ri-user-line",
        },
    ];


    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

    return (
        <div className="main">
            <div className="d-flex layout">
                <div className="sidebar">
                    <div className="logo">
                        <h1>HC</h1>
                        <h1 className="role">{role}</h1>
                        <hr />
                    </div>

                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div key={menu.path} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            );
                        })}

                        <div className={`d-flex menu-item `} onClick={() => {
                            localStorage.clear();
                            navigate('/login')
                        }}>
                            <i className='ri-logout-circle-line'></i>
                            <Link to='/login'>Logout</Link>
                        </div>

                    </div>
                </div>

                <div className="content">
                    <div className="header">
                        <div className="title">Health Care</div>
                        <div className="d-flex align-items-center px-4">

                            <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                                {/* Notification Icon */}
                                <i className="ri-notification-line header-action-icon px-3"></i>
                            </Badge>
                            <Link className="anchor" to="/profile">{user?.name}</Link>
                        </div>
                    </div>

                    <div className="body">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    )
}




export default Layout;