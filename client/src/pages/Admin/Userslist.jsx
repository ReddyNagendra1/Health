import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../../redux/alertSlice';
// import axios from 'axios';
import { Table } from "antd";
import moment from 'moment';
import api from '../../config/api'

function Userslist() {
    const [users, setUsers] = useState([]);
    // console.log
    const dispatch = useDispatch();
    const getUsersData = async () => {
        try {
            dispatch(showLoading());
            // console.log("Sending request to /api/admin/get-all-users");
            const response = await axios.get("http://localhost:5000/api/admin/get-all-users", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            // console.log("Received response:", response);
            if (response.data.success) {
                // console.log("Data received:", response.data.data);
                setUsers(response.data.data);
            }
        } catch (error) {
            // console.error("Error fetching users:", error);
            dispatch(hideLoading());
        }
    };
    const changeUserStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await api.post("/api/admin/change-user-account-status",
                { userId: record._id, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getUsersData(); // Refresh user list after status change
            }
        } catch (error) {
            toast.error('Error changing user account status');
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getUsersData();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },

        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    <h1 className="anchor">Block</h1>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className="page-header">Users List</h1>
            <hr />
            <Table columns={columns} dataSource={users.map(user => ({ ...user, key: user._id }))} />
        </Layout>
    );
}


export default Userslist;