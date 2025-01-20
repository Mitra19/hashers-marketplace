// Dashboard.tsx
import { useState, useEffect } from "react";
import { getItems } from "./../LocalStorage"; // adjust the import path as needed
import AddItemForm from "./AddItemForm"; // Import the AddItemForm component

export default function Dashboard() {
  const [items, setItems] = useState<any[] | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch items from localStorage on component mount
  useEffect(() => {
    const fetchedItems = getItems();
    setItems(fetchedItems);
  }, []);

  // Refresh the items list after adding an item
  const handleItemAdded = () => {
    setItems(getItems());
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
                <li key={index}>
                  <strong>{item.itemName}</strong> - INR {item.itemPrice}
                  <br />
                  {item.itemDescription}
                  <br />
                  <img src={item.itemImage} alt={item.itemName} style={{ width: "100px" }} />
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
