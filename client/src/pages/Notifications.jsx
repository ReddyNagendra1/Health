import React from "react";
import Layout from "../components/layout";
import { Tabs } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from "../redux/userSlice";
import useDebounceNavigation from "./Debounce";


function Notifications() {
    const { user } = useSelector((state) => state.user);
    const debouncedNavigate = useDebounceNavigation();
    const dispatch = useDispatch();

    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5000/api/user/mark-all-notifications-as-seen', { userId: user._id }, {
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
            const response = await axios.post('http://localhost:5000/api/user/delete-all-notifications', { userId: user._id }, {
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

    return (
        <Layout>
            <h1 className="page-title">Notifications</h1>

            <Tabs>
                <Tabs.TabPane tab='Unread' key={0}>
                    <div className="d-flex justify-content-end">
                        <h1 className="anchor" onClick={() => markAllAsSeen()}>Mark all as seen</h1>
                    </div>
                    {user?.unseenNotifications.map((notification) => (
                        <div className="card p-2" key={notification.id} onClick={() => debouncedNavigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab='Read' key={1}>
                    <div className="d-flex justify-content-end">
                        <h1 className="anchor" onClick={() => deleteAll()}>Delete all</h1>
                    </div>
                    {user?.seenNotifications.map((notification) => (
                        <div className="card p-2" key={notification.id} onClick={() => debouncedNavigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
};

export default Notifications;