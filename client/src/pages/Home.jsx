import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from "../redux/alertSlice";
import Doctor from '../components/Doctor';

const Home = () => {
    const dispatch = useDispatch();
    const [doctors, setDoctors] = useState([]);
    const getData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                Navigate('/login');
                return;
            }
            dispatch(showLoading())
            const response = await axios.get("http://localhost:5000/api/user/get-all-approved-doctors", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            dispatch(hideLoading())
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading())
        }
    };

    useEffect(() => {
        getData()
    }, [])
    return (
        <Layout>
            <h1>HomePage</h1>
        </Layout>
    );
};

export default Home;


// http://localhost:5000/api/user/get-user-info-by-id