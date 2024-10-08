
import useRole from '../../../hooks/useRole';
import AdminStatistics from '../Admin/AdminStatistics';
import HostStatistics from '../Host/HostStatistics';
import GuestStatistics from '../Guest/GuestStatistics';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const Statistics = () => {
    const [role , isLoading] = useRole()   
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            {role === 'admin' && <AdminStatistics></AdminStatistics>}
            {role === 'host' && <HostStatistics></HostStatistics>}
            {role === 'guest' && <GuestStatistics></GuestStatistics>}
        </div>
    );
};

export default Statistics;