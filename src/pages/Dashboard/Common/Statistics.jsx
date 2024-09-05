import React from 'react';
import useAuth from '../../../hooks/useAuth';

const Statistics = () => {
    const {user} = useAuth()
    return (
        <div>
            <h1>Welcome to dashboard Md : {user?.displayName}</h1>
        </div>
    );
};

export default Statistics;