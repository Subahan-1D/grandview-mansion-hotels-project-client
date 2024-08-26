import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Sidebar from "../components/Dashbord/Sidebar/Sidebar";


const DashboardLayout = () => {
    return (
      <div className=" relative min-h-screen md:flex">
        {/* side bar */}
        <div>
            <Sidebar></Sidebar>
        </div>
        {/* dynamic content */}
        <div className="flex-1 md:ml-64">
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashboardLayout;