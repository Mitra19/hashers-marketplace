// AddItemForm.tsx
import { useState , type FC} from "react";
import { addItem, ItemsToSell } from "./../LocalStorage"; // adjust the import path as needed

interface AddItemFormProps {
  onItemAdded: () => void;
  closeForm: () => void;
}

const AddItemForm: FC<AddItemFormProps> = ({ onItemAdded, closeForm }) => {
  const [newItem, setNewItem] = useState<ItemsToSell>({
    itemName: "",
    itemPrice: 0,
    itemDescription: "",
    itemImage: "",
  });

  // Handle input changes for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add a new item
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(newItem);
    onItemAdded(); // Notify parent that an item has been added
    setNewItem({
      itemName: "",
      itemPrice: 0,
      itemDescription: "",
      itemImage: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          name="itemName"
          value={newItem.itemName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Item Price:</label>
        <input
          type="number"
          name="itemPrice"
          value={newItem.itemPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Item Description:</label>
        <textarea
          name="itemDescription"
          value={newItem.itemDescription}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Item Image URL:</label>
        <input
          type="text"
          name="itemImage"
          value={newItem.itemImage}
          onChange={handleInputChange}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Add Item
      </button>
      <button
        type="button"
        onClick={closeForm}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FF6347",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddItemForm;
