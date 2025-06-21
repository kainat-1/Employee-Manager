import React from "react";
import { useAuth } from "../context/authcontext";


const AdminDashboard = () => {

  const { user } = useAuth();

  return <div>AdminDashboard {user && user.name}</div>;
};
export default AdminDashboard;
