import { FC } from "react";

interface NavbarProps {
  username: string;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const Navbar: FC<NavbarProps> = ({ username, onLogout, onSearch }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
        zIndex: 1000,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        Hashedin Marketplace App
      </div>
      <div style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 15px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#40a9ff";
            e.target.style.boxShadow = "0 4px 8px rgba(64, 169, 255, 0.5)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#999",
          }}
        >
          🔍
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span>{username}</span>
        <button
          onClick={onLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#ff7875";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#ff4d4f";
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
