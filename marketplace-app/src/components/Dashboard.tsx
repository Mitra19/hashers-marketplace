// Dashboard.tsx
import { useState, useEffect } from "react";
import { getItems, getActiveUser, removeItem ,updateItemRating} from "./../LocalStorage"; // Import necessary functions
import AddItemForm from "./AddItemForm"; // Import the AddItemForm component

export default function Dashboard() {
  const [items, setItems] = useState<any[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeUser, setActiveUser] = useState<any | null>(null);

  // Fetch active user and items from localStorage on component mount
  useEffect(() => {
    const fetchedActiveUser = getActiveUser();
    setActiveUser(fetchedActiveUser);

    const fetchedItems = getItems();
    setItems(fetchedItems);
  }, []);

  // Refresh the items list after adding or removing an item
  const handleItemAdded = () => {
    setItems(getItems());
  };

  const handleItemRemoved = (itemName: string) => {
    removeItem(itemName);
    setItems(getItems());
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleRateItem = (itemName: string) => {
    const rating = prompt(`Rate ${itemName} out of 5:`);
    if (rating) {
      alert(`You rated ${itemName} with ${rating} stars!`);
      updateItemRating(itemName, parseInt(rating));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        maxWidth: "100%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
          marginBottom: "20px",
        }}
      >
        {activeUser ? (
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
        ) : (
          <p>Please log in to add items.</p>
        )}
      </div>

      {showForm && (
        <div style={{ marginBottom: "20px", width: "100%" }}>
          <AddItemForm onItemAdded={handleItemAdded} closeForm={closeForm} />
        </div>
      )}

      <div
        style={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {items && items.length > 0 ? (
          <div>
            <h2 style={{ textAlign: "center" }}>Items List</h2>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    margin: "10px",
                    width: "calc(50% - 20px)",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <strong>{item.itemName}</strong> - INR {item.itemPrice}
                  <p>{item.itemDescription}</p>
                  <p>Seller - {item.owner}</p>
                  <p>Rating - {item.rating}/5</p>
                  <img
                    src={item.itemImage}
                    alt={item.itemName}
                    style={{ width: "80px", marginTop: "10px" }}
                  />
                  {activeUser && item.owner === activeUser.username ? (
                    <button
                      onClick={() => handleItemRemoved(item.itemName)}
                      disabled={!activeUser || item.owner !== activeUser.username}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FF6347",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: activeUser && item.owner === activeUser.username
                          ? "pointer"
                          : "not-allowed",
                        marginTop: "10px",
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRateItem(item.itemName)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FFD700",
                        color: "black",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                    >
                      Rate
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No items found</p>
        )}
      </div>
    </div>
  );
}
