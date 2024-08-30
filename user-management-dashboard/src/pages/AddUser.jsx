import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddUser.css'

const AddUser = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ message: '', type: '' }); 

    const handleSave = async (user) => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
            if (response.status === 201) {
                setAlert({ message: 'User added successfully!', type: 'success' });
                setTimeout(() => navigate('/'), 2000); 
            } else {
                setAlert({ message: 'Failed to save user. Please try again.', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'Error saving user. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="container">
            <h2>Add New User</h2>
            {alert.message && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <UserForm onSave={handleSave} />
        </div>
    );
};

export default AddUser;
