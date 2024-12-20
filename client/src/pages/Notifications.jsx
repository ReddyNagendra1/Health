import React from "react";
import Layout from "../components/layout";
import { Tabs } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertSlice";
// import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from "../redux/userSlice";
import api from "../config/api";

function Notifications() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading());
            const response = await api.post('/api/user/mark-all-notifications-as-seen', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    }

    const deleteAll = async () => {
        try {
            dispatch(showLoading());
            const response = await api.post('/api/user/delete-all-notifications', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    }


    const items = [
        {
            key: '0',
            label: 'Unread',
            children: (
                <div>
                    <div className="d-flex justify-content-end">
                        <h1 className="anchor" onClick={() => markAllAsSeen()}>Mark all as seen</h1>
                    </div>
                    {user?.unseenNotifications.map((notification, index) => (
                        <div
                            className="card p-2"
                            key={`unseen-${index}-${notification.timestamp || index}`}
                            onClick={() => navigate(notification.onClickPath)}
                        >
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </div>
            )
        },
        {
            key: '1',
            label: 'Read',
            children: (
                <div>
                    <div className="d-flex justify-content-end">
                        <h1 className="anchor" onClick={() => deleteAll()}>Delete all</h1>
                    </div>
                    {user?.seenNotifications.map((notification, index) => (
                        <div
                            className="card p-2"
                            key={`seen-${index}-${notification.timestamp || index}`}
                            onClick={() => navigate(notification.onClickPath)}
                        >
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </div>
            )
        }
    ];

    return (
        <Layout>
            <h1 className="page-title">Notifications</h1>
            <hr />
            <Tabs items={items} />
        </Layout>
    )
};

export default Notifications;