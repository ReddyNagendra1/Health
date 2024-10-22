import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { showLoading, hideLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

function ProtectedRoute(props) {
    const { user, reloadUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('http://localhost:5000/api/user/get-user-info-by-id/get-user-info-by-id', { token: localStorage.getIteam('token') }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                // localStorage.clear();
                // localStorage.removeItem('token');
                navigate('/login')
                // setIsLoading(false);
            }
        } catch (error) {
            dispatch(hideLoading());
            // localStorage.clear();
            // localStorage.removeItem('token');
            navigate('/login')
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (localStorage.getItem('token')) {
        return props.children;
    } else {
        return <Navigate to='/login' />;
    }
}

export default ProtectedRoute;