import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { showLoading, hideLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";
import api from '../config/api'

function ProtectedRoute(props) {
    const { user, reloadUser } = useSelector((state) => state.user)
    // console.log(user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id', { token }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                localStorage.clear();
                navigate('/login')
                // setIsLoading(false);
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            navigate('/login')
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user]);

    if (localStorage.getItem('token')) {
        return props.children;
    } else {
        return <Navigate to='/login' />
    }
};

export default ProtectedRoute;




