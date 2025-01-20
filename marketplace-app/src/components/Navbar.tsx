import { FC } from "react";

interface NavbarProps {
  username: string;
  onLogout: () => void;
}

const Navbar: FC<NavbarProps> = ({ username, onLogout }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // Ensures vertical alignment in the center
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
        zIndex: 1000,
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        Hashedin Marketplace App
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center", // This ensures both the username and button are aligned on the same line
          gap: "10px", // Spacing between username and button
        }}
      >
        <span>{username}</span>
        <button
          onClick={onLogout}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
