import { useState, useEffect } from "react";
import { getItems, getActiveUser, removeItem, updateItemRating, removeActiveUser } from "./../LocalStorage"; // Import necessary functions
import AddItemForm from "./AddItemForm"; 
import Navbar from "./Navbar"; 
import { useNavigate } from "react-router";
export default function Dashboard() {
  const [items, setItems] = useState<any[] | null>(null); // State to keep items with respect to owner
  const [showForm, setShowForm] = useState(false); //State that takes care of showing the form
  const [activeUser, setActiveUser] = useState<any | null>(null); // State to keep active user in check
  const [sortOrder, setSortOrder] = useState<string>("default"); // State for sorting order
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

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
  //To help in navigation to different routes
  const navigate = useNavigate();

  // Handle logout (it will first remove active user from local storage,
  // give logout alert and the route
  // to login page)
  const handleLogout = () => {
    removeActiveUser();
    alert("Logged out!");
    navigate("/login");
  };

// This fuction is triggered when delete button is clicked
// It removes the item from the list and updates the state
  const handleItemRemoved = (itemName: string) => {
    removeItem(itemName);
    setItems(getItems());
  };

  const closeForm = () => {
    setShowForm(false);
  };
// This function is triggered when rate button is clicked
// an alert pops for inputting rating out of 5
  const handleRateItem = (itemName: string) => {
    const rating = prompt(`Rate ${itemName} out of 5:`);
    if (rating) {
      alert(`You rated ${itemName} with ${rating} stars!`);
      updateItemRating(itemName, parseInt(rating)); // updates rating in local storage
    }
  };

  // Filter items based on search query
  const filteredItems = () => {
    if (!items) return null;

    return items.filter((item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Sort items based on the selected order
  const sortedItems = () => {
    const currentItems = filteredItems();

    if (!currentItems) return null;

    if (sortOrder === "lowToHigh") {
      return [...currentItems].sort((a, b) => a.itemPrice - b.itemPrice);
    } else if (sortOrder === "highToLow") {
      return [...currentItems].sort((a, b) => b.itemPrice - a.itemPrice);
    } else if (sortOrder === "rating-highToLow") {
      return [...currentItems].sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === "rating-lowToHigh") {
      return [...currentItems].sort((a, b) => a.rating - b.rating);
    }else if (sortOrder === "aToZ") {
    return [...currentItems].sort((a, b) => a.itemName.localeCompare(b.itemName));
  } else if (sortOrder === "zToA") {
    return [...currentItems].sort((a, b) => b.itemName.localeCompare(a.itemName));
  }
    return currentItems;
  };

  return (
    <div
      style={{
        minHeight: "100vh", 
        backgroundColor: "#000",
        color: "#fff", 
        paddingTop: "60px", 
        boxSizing: "border-box",
      }}
    >
      <Navbar
        username={activeUser?.username || "Guest"}
        onLogout={() => handleLogout()} 
        onSearch={(query) => setSearchQuery(query)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
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

        {/* Filter Dropdown */}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            marginBottom: "20px",
          }}
        >
          <label htmlFor="priceFilter" style={{ marginRight: "10px" }}>
            Sort by:
          </label>
          <select
            id="priceFilter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating-highToLow">Rating: High to Low</option>
            <option value="rating-lowToHigh">Rating: Low to High</option>
            <option value="aToZ">Name: A to Z</option>
            <option value="zToA">Name: Z to A</option>
            
          </select>
        </div>

        <div
          style={{
            width: "100%",
            height: "100%",
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
                  justifyContent:
                    items.length === 1 ? "center" : "space-between", 
                  gap: "10px", 
                }}
              >
                {sortedItems()!.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "15px",
                      width: "calc(50% - 20px)",
                      maxWidth: "400px",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      minHeight: "300px",
                      maxHeight: "400px",
                      overflow: "hidden",
                      backgroundColor: "#333", 
                      color: "#fff", 
                    }}
                  >
                    <strong>{item.itemName}</strong> - INR {item.itemPrice}
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        margin: "10px 0",
                      }}
                    >
                      {item.itemDescription}
                    </p>
                    <p>Seller - {item.owner}</p>
                    <p>Rating - {item.rating}/5</p>
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        marginTop: "10px",
                      }}
                    />
                    {activeUser && item.owner === activeUser.username ? (
                      <button
                        onClick={() => handleItemRemoved(item.itemName)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#FF6347",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
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
    </div>
  );
}
