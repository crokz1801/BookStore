import React from "react";
import { useAuth } from "../content/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setauthUser] = useAuth();
  const handleLogout = () => {
    try {
      setauthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("USers");
      toast.success("Logout sccessfully");
      setTimeout(() => {
        
      window.location.reload();
        }, 1000);
      
    } catch (err) {
      toast.error("error: " + err.message);
    }
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
