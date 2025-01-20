// Dashboard.tsx
import { useState, useEffect } from "react";
import { getItems, removeItem, getActiveUser } from "./../LocalStorage"; // Import getActiveUser
import AddItemForm from "./AddItemForm"; // Import the AddItemForm component

export default function Dashboard() {
  const [items, setItems] = useState<any[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeUser, setActiveUser] = useState<any | null>(null);

  // Fetch items from localStorage and active user on component mount
  useEffect(() => {
    const fetchedItems = getItems();
    setItems(fetchedItems);

    const fetchedActiveUser = getActiveUser();
    setActiveUser(fetchedActiveUser);
  }, []);

  // Refresh the items list after adding or removing an item
  const handleItemAdded = () => {
    setItems(getItems());
  };

  // Refresh the items list after an item is deleted
  const handleItemRemoved = (itemName: string) => {
    removeItem(itemName);
    setItems(getItems()); // Refresh the items list
  };

  // Close the form without adding an item
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Item
      </button>

      {showForm && (
        <AddItemForm onItemAdded={handleItemAdded} closeForm={closeForm} />
      )}

      <div>
        {items && items.length > 0 ? (
          <div>
            <h2>Items List</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index} style={{ marginBottom: "15px" }}>
                  <strong>{item.itemName}</strong> - INR {item.itemPrice}
                  <br />
                  {item.itemDescription}
                  <br />
                  Seller - {item.owner}
                  <br />
                  <img
                    src={item.itemImage}
                    alt={item.itemName}
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                  <br />
                  <button
                    onClick={() => handleItemRemoved(item.itemName)}
                    disabled={!activeUser || item.owner !== activeUser.username}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#FF6347",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: activeUser && item.owner === activeUser.username ? "pointer" : "not-allowed",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}
