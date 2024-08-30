import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        department: '',
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <label>Department:</label>
            <input
                type="text"
                name="department"
                value={formData.company?.name}
                onChange={handleChange}
                required
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default UserForm;
