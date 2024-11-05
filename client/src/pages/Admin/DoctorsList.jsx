import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Table } from "antd";
import moment from 'moment';
import api from '../../config/api'

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const dispatch = useDispatch();

    const getDoctorsData = async () => {
        try {
            dispatch(showLoading());
            const response = await api.get("/api/admin/get-all-doctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Error fetching doctors data');
        }
    };

    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await api.post(
                "/api/admin/change-doctor-account-status",
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
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

    // Define base columns
    const baseColumns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span className="font-medium">
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
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <span className={`capitalize ${status === 'approved' ? 'text-green-600' :
                    status === 'declined' ? 'text-red-600' :
                        'text-yellow-600'
                    }`}>
                    {status}
                </span>
            )
        },
    ];

    // Adding only Actions column if there are pending doctors
    const columns = [...baseColumns];
    if (doctors.some(doctor => doctor.status === "pending")) {
        columns.push({
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                // Showing actions for pending status
                if (record.status === "pending") {
                    return (
                        <div className="space-x-2">
                            <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => changeDoctorStatus(record, "approved")}
                            >
                                Approve
                            </button>
                            <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => changeDoctorStatus(record, "declined")}
                            >
                                Decline
                            </button>
                        </div>
                    );
                }
                return null;
            },
        });
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Doctors List</h1>
            <hr />
            <div className="bg-white rounded-lg shadow">
                <Table
                    columns={columns}
                    dataSource={doctors.map(doctor => ({
                        ...doctor,
                        key: doctor._id
                    }))}
                    pagination={{
                        pageSize: 10,
                        hideOnSinglePage: true
                    }}
                />
            </div>
        </Layout>
    );
};

export default DoctorsList;