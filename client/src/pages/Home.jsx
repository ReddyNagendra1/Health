import axios from 'axios';
import { React, useEffect } from 'react';
import Layout from '../components/layout';

const Home = () => {
    const getData = async () => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            if (token) {
                // Making sure token is parsed correctly
                const parsedToken = JSON.parse(token);

                // Send the request with token in Authorization header
                const response = await axios.get('http://localhost:5000/api/user/get-user-info-by-id', {
                    headers: {
                        Authorization: `Bearer ${parsedToken}`,  // Use template literal
                    },
                });

                // Log user data
                console.log('User data:', response.data);

            } else {
                console.error('No token found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Layout>
            <h1>HomePage</h1>
        </Layout>
    );
};

export default Home;
