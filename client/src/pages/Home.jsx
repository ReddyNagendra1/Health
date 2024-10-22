import axios from 'axios';
import { React, useEffect } from 'react';
import Layout from '../components/layout';
import { useDispatch } from 'react-redux'
import { hideLoading } from "../redux/alertSlice";

const Home = () => {
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get("/api/user/get-all-approved-doctors", {
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
    })
    return (
        <Layout>
            <h1>HomePage</h1>
        </Layout>
    );
};

export default Home;


// http://localhost:5000/api/user/get-user-info-by-id