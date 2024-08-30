import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/EditUser.css'

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        company: { name: '' } 
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
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
            await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
            navigate('/', { state: { updatedUser: user } });
        } catch (error) {
            console.error('Error updating user data', error);
        }
    };

    return (
        <div className='edit'>
            <h2>Edit User</h2>
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
