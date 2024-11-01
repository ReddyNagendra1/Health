import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Table } from "antd";
import moment from 'moment';

function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get(
                "/api/doctor/get-appointments-by-doctor-id",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                // Map each appointment to add a unique key for the table
                const appointmentsWithKey = response.data.data.map((appointment) => ({
                    ...appointment,
                    key: appointment._id,
                }));
                setAppointments(appointmentsWithKey);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Failed to fetch appointments");
        }
    };

    const changeAppointmentStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const resposne = await axios.post(
                "/api/doctor/change-appointment-status",
                { appointmentId: record._id, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (resposne.data.success) {
                toast.success(resposne.data.message);
                getAppointmentsData();
            }
        } catch (error) {
            toast.error("Error changing doctor account status");
            dispatch(hideLoading());
        }
    };

    const columns = [
        {
            title: "Appointment ID",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Patient Name",
            dataIndex: "name",

            render: (text, record) => (
                <span>
                    {record.userInfo.name || ""}
                </span>
            ),
        },
        {
            title: "Doctor Phone",
            dataIndex: "doctorPhone",
            key: "doctorPhone",
            render: (text, record) => (
                <span>{record.doctorInfo?.phoneNumber || "N/A"}</span>
            ),
        },
        {
            title: "Date & Time",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")}{" "}
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <div className="d-flex">
                            <h1
                                className="anchor px-2"
                                onClick={() => changeAppointmentStatus(record, "approved")}
                            >
                                Approve
                            </h1>
                            <h1
                                className="anchor"
                                onClick={() => changeAppointmentStatus(record, "rejected")}
                            >
                                Reject
                            </h1>
                        </div>
                    )}
                </div>
            ),
        },

    ];

    useEffect(() => {
        getAppointmentsData();
    }, []);

    return (
        <Layout>
            <h1 className="page-header">Doctor Appointments</h1>
            <hr />
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    );
}

export default DoctorAppointments;
