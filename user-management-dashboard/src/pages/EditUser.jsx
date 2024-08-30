import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/EditUser.css';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        company: { name: '' }
    });
    const [alert, setAlert] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
            } catch (error) {
                setAlert({ message: 'Error fetching user data. Please try again.', type: 'error' });
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleCompanyChange = (e) => {
        setUser({
            ...user,
            company: { name: e.target.value }
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
            if (response.status === 200) {
                setAlert({ message: 'User updated successfully!', type: 'success' });
                setTimeout(() => navigate('/', { state: { updatedUser: user } }), 2000); 
            } else {
                setAlert({ message: 'Failed to update user. Please try again.', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'Error updating user data. Please try again.', type: 'error' });
        }
    };

    return (
        <div className='edit'>
            <h2>Edit User</h2>
            {alert.message && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <form onSubmit={handleFormSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                    />
                </label>
               
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Department:
                    <input
                        type="text"
                        name="company"
                        value={user.company?.name}
                        onChange={handleCompanyChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditUser;
