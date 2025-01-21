
import Dashboard from "./Dashboard";

const Home = () => {


  return (
    <div>
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