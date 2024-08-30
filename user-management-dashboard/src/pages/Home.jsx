import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css'
const Home = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUser()
    }, []);

   

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            
            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete user. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleEdit = (user) => {
        navigate(`/edit-user/${user.id}`, { state: { user } }); 
    };

    return (
        <div className="container">
            <h1>User Management</h1>
            <UserList  users={users} onEdit={handleEdit} onDelete={handleDelete}  />
        </div>
    );
};

export default Home;
