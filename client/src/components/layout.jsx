import React from "react";
import '../layout.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Badge } from "antd";


function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
    console.log(user);
    const userMenu = [
        {
            name: 'Home',
            path: '/home',
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

    const adminMenu = [
        {
            name: 'Home',
            path: '/home',
            icon: 'ri-home-line'
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: 'ri-user-line'
        },
        {
            name: 'Doctors',
            path: '/admin/doctors',
            icon: 'ri-user-star-line'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-profile-line'
        }
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
    return (
        <div className="main">
            <div className="flexlayout">
                {/* Sidebar Section */}
                <div className="sidebar">
                    <div className="user-info">
                        {/* Display User Image */}
                        <img className="user-image" src={user?.profileImage || "/default-avatar.png"} alt="User Avatar" />
                        {/* Display User Name */}
                        <div className="user-name">
                            <Link className="anchor" to="/profile">{user?.name || "Guest"}</Link>
                            <h1 className="role">{role}</h1>
                        </div>
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
                        <div key="logout" className={'d-flex menu-item'} onClick={() => {
                            localStorage.clear()
                            Navigate('/login')
                        }}>
                            <i className='ri-logout-circle-line'></i>
                            <Link to='/login'>Logout</Link>
                        </div>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="content">
                    <div className="header">
                        <div className="title">Health Care</div>
                        <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                            {/* Notification Icon */}
                            <i className="ri-notification-line header-icon"></i>

                        </Badge>
                        <Link className="anchor mx-3" to='/profile'>{user?.name}</Link>
                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
