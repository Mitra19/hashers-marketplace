import { useEffect, useState } from "react";
import { IUserModel, getActiveUser, removeActiveUser } from "./../LocalStorage";
import { useNavigate } from "react-router";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

const Home = () => {
  const [activeUser, setActiveUser] = useState<IUserModel>();

  useEffect(() => {
    const user = getActiveUser();
    if (user) setActiveUser(user);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeActiveUser();
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      {activeUser && <Navbar username={activeUser.name} onLogout={handleLogout} />}

      {/* Dashboard*/}
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 50,
          flexDirection: "column",
        }}
      >
        <Dashboard></Dashboard>
      </div>
    </div>
  );
};

export default Home;