import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from 'react-hot-toast';
// import axios from 'axios';
import DoctorForm from "../../components/DoctorForm";
import moment from 'moment';
import api from '../../config/api'

function Profile() {
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const formattedValues = {
                ...values,
                Availability: values.Availability ? [
                    moment(values.Availability[0]).format("HH:mm"),
                    moment(values.Availability[1]).format("HH:mm"),
                ] : [],
            };

            const response = await api.post(
                "/api/doctor/update-doctor-profile",
                {
                    ...formattedValues,
                    userId: user?._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getDoctorData();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    const getDoctorData = async () => {
        try {
            if (!user?._id) {
                return;
            }
            dispatch(showLoading());
            const response = await api.post(
                "/api/doctor/get-doctor-info-by-user-id",
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            dispatch(hideLoading());
            if (response.data.success) {
                const doctorData = response.data.data;

                if (doctorData.Availability && doctorData.Availability.length === 2) {
                    doctorData.Availability = [
                        moment(doctorData.Availability[0], "HH:mm"),
                        moment(doctorData.Availability[1], "HH:mm")
                    ];
                }
                setDoctor(doctorData);
            } else {
                toast.error("Failed to fetch doctor data.");
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            toast.error("An error occurred while fetching doctor data.");
        }
    };

    // Modifing useEffect to handle user dependency
    useEffect(() => {
        if (user?._id) {
            getDoctorData();
        }
    }, [user]);

    // Adding check for loading state
    if (!user || !doctor) {
        return (
            <Layout>
                <div className="spinner-parent">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="page-title">Doctor Profile</h1>
            <hr />
            {doctor && (
                <DoctorForm
                    onFinish={onFinish}
                    initialValues={{
                        ...doctor,
                        Availability: doctor.Availability ? [
                            moment(doctor.Availability[0]),
                            moment(doctor.Availability[1])
                        ] : []
                    }}
                />
            )}
        </Layout>
    );
}

export default Profile;