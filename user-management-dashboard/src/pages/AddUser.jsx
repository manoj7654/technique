import React from 'react';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddUser.css'

const AddUser = () => {
    const navigate = useNavigate();

    const handleSave = async (user) => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
                if (response.status === 201) {
                navigate('/');
            } else {
                console.error('Failed to save user. Please try again.');
            }
        } catch (error) {
            console.error('Error saving user', error);
        }
    };

    return (
        <div className="container">
            <h2>Add New User</h2>
            <UserForm onSave={handleSave} />
        </div>
    );
};

export default AddUser;
