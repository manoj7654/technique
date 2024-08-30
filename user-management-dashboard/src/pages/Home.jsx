import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import { useNavigate as navigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({ message: '', type: '' }); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);
            } catch (error) {
                setAlert({ message: 'Error fetching user data. Please try again.', type: 'error' });
                console.error('Error fetching user data', error);
            }
        };
        fetchUser();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            if (response.status === 200) {
                setAlert({ message: 'User deleted successfully!', type: 'success' });
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            } else {
                setAlert({ message: 'Failed to delete user. Please try again.', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'Error deleting user. Please try again.', type: 'error' });
        }
    };

    const handleEdit = (user) => {
        navigate(`/edit-user/${user.id}`, { state: { user } });
    };

    return (
        <div className="container">
            <h1>User Management</h1>
            
            {alert.message && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
            
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Home;
