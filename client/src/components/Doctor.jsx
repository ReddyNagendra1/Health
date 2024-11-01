import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

function Doctor({ doctor }) {
    const navigate = useNavigate();

    return (
        <div
            className="card p-2 cursor-pointer"
            onClick={() => navigate(`/book-appointment/${doctor._id}`)}
        >
            <h1 className="card-title">
                {doctor.firstName} {doctor.lastName}
            </h1>
            <hr />
            <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber || "N/A"}
            </p>
            <p>
                <b>Address : </b>
                {doctor.Address || "N/A"}
            </p>
            <p>
                <b>Experience : </b>
                {doctor.Experience || "N/A"}
            </p>
            <p>
                <b>Specialization : </b>
                {doctor.Specialization || "N/A"}
            </p>
            <p>
                <b>Availability : </b>
                {doctor.Availability[0]} - {doctor.Availability[1]}
            </p>
        </div>
    );
}

export default Doctor;
