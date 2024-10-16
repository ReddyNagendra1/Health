import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { showLoading, hideLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

function ProtectedRoute(props) {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async () => {

        try {
            dispatch(showLoading());
            const response = await axios.get('/get-user-info-by-id',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                navigate('/login')
            }
        } catch (error) {
            dispatch(hideLoading());
            navigate('/login')
        }
    }

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user]);

    if (localStorage.getItem('token')) {
        return props.children;
    } else {
        return <Navigate to='/login' />
    }

    // return (
    //     <div>ProtectedRoute</div>
    // )
};

export default ProtectedRoute;
