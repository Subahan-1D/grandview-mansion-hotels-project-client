import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import AdminStatistics from '../Admin/AdminStatistics';

const Statistics = () => {
    const [role , isLoading] = useRole()   
    const {user} = useAuth()
    return (
        <div>
            {role === 'admin' && <AdminStatistics></AdminStatistics>}
        </div>
    );
};

export default Statistics;