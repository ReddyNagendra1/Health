import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Table } from "antd";
import moment from 'moment';

function DoctorsList() {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const getDoctorsData = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/admin/get-all-doctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
                setDoctors(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const resposne = await axios.post(
                "/api/admin/change-doctor-account-status",
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (resposne.data.success) {
                toast.success(resposne.data.message);
                getDoctorsData();
            }
        } catch (error) {
            toast.error('Error changing doctor account status');
            dispatch(hideLoading());
        }
    };
    useEffect(() => {
        getDoctorsData();
    }, []);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: "status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <h1
                            className="anchor"
                            onClick={() => changeDoctorStatus(record, "approved")}
                        >
                            Approve
                        </h1>
                    )}
                    {record.status === "approved" && (
                        <h1
                            className="anchor"
                            onClick={() => changeDoctorStatus(record, "blocked")}
                        >
                            Block
                        </h1>
                    )}
                </div>
            ),
        },
    ];
    return (
        <Layout>
            <h1 className="page-header">Doctors List</h1>
            <hr />
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    );
}

export default DoctorsList;