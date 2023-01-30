import { FC } from "react";
import { Outlet } from "react-router-dom";

export const DashboardLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
