import { React, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../redux/alertSlice";
import { Col, Row } from "antd";
import Layout from '../components/layout';
import Doctor from "../components/Doctor";
import api from "../config/api";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [doctors, setDoctors] = useState([]);

    const getData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            dispatch(showLoading());
            const response = await axios.get("http://localhost:5000/api/user/get-all-approved-doctors", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            console.log('Request failed:', error);
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout>
            <Row gutter={[20, 20]}>
                {doctors.map((doctor) => (
                    <Col key={doctor._id} span={8} xs={24} sm={24} lg={8}>
                        <Doctor doctor={doctor} />
                    </Col>
                ))}
            </Row>
        </Layout>
    );
};

export default Home;