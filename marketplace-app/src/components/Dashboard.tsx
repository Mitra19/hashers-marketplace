import { useState, useEffect } from "react";
import { getItems, getActiveUser, removeItem, updateItemRating, removeActiveUser } from "./../LocalStorage";
import AddItemForm from "./AddItemForm";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [items, setItems] = useState<any[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchedActiveUser = getActiveUser();
    setActiveUser(fetchedActiveUser);
    setItems(getItems());
  }, []);

  const handleLogout = () => {
    removeActiveUser();
    alert("Logged out!");
    navigate("/login");
  };

  const handleItemAdded = () => {
    setItems(getItems());
  };

  const handleItemRemoved = (itemName: string) => {
    removeItem(itemName);
    setItems(getItems());
  };

  const handleRateItem = (itemName: string) => {
    const rating = prompt(`Rate ${itemName} out of 5:`);
    if (rating) {
      alert(`You rated ${itemName} with ${rating} stars!`);
      updateItemRating(itemName, parseInt(rating));
      setItems(getItems());
    }
  };

  const filteredItems = () => {
    if (!items) return null;

    return items.filter((item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortedItems = () => {
    const currentItems = filteredItems();
    if (!currentItems) return null;

    switch (sortOrder) {
      case "lowToHigh":
        return [...currentItems].sort((a, b) => a.itemPrice - b.itemPrice);
      case "highToLow":
        return [...currentItems].sort((a, b) => b.itemPrice - a.itemPrice);
      case "rating-highToLow":
        return [...currentItems].sort((a, b) => b.rating - a.rating);
      case "rating-lowToHigh":
        return [...currentItems].sort((a, b) => a.rating - b.rating);
      case "aToZ":
        return [...currentItems].sort((a, b) => a.itemName.localeCompare(b.itemName));
      case "zToA":
        return [...currentItems].sort((a, b) => b.itemName.localeCompare(a.itemName));
      default:
        return currentItems;
    }
  };

  return (
    <div className="dashboard">
      <Navbar
        username={activeUser?.username || "Guest"}
        onLogout={handleLogout}
        onSearch={(query) => setSearchQuery(query)}
      />

      <div className="dashboard-container">
<br></br>
        <h1 className="dashboard-title"></h1>
        <div className="dashboard-header">
          {activeUser ? (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Add Item
            </button>
          ) : (
            <p className="login-message">Please log in to add items.</p>
          )}
        </div>

        {showForm && (
          <AddItemForm onItemAdded={handleItemAdded} closeForm={() => setShowForm(false)} />
        )}

        <div className="dashboard-filters">
          <label htmlFor="sortOrder">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
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

        <ul className="item-list">
          {sortedItems()?.map((item, index) => (
            <li className="item-card" key={index}>
              <img
                className="item-image"
                src={item.itemImage}
                alt={item.itemName}
              />
              <div className="item-details">
                <h3 className="item-name">{item.itemName}</h3>
                <p className="item-price">₹{item.itemPrice}</p>
                <p className="item-description">{item.itemDescription}</p>
                <p className="item-owner">Seller: {item.owner}</p>
                <p className="item-rating">Rating: {item.rating}/5</p>
              </div>
              <div className="item-actions">
                {activeUser && item.owner === activeUser.username ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleItemRemoved(item.itemName)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRateItem(item.itemName)}
                  >
                    Rate
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {items && items.length === 0 && (
          <p className="empty-state">No items available.</p>
        )}
      </div>
    </div>
  );
}
