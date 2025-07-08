import React from "react";
import { useAuth } from "../../context/authcontext";

const Navbar = () => {
  const { user , logout} = useAuth();
  return (
    <div className="flex item-center text-white justify-between h12 bg-teal-500 px-5">
      <p>Welcome {user.name} </p>

      <button className="px-4 py-1 bg-teal-700 text-white rounded hover:bg-teal-800" onClick={logout}>
        
        Logout
      </button>
    </div>
  );
};
export default Navbar;
