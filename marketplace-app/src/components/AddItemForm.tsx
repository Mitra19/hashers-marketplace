import { useState, FC } from "react";
import { addItem, ItemsToSell } from "./../LocalStorage"; 
import styles from "./AddItemForm.module.css"; 

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(newItem);
    onItemAdded();
    setNewItem({
      itemName: "",
      itemPrice: 0,
      itemDescription: "",
      itemImage: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label className={styles.label}>Item Name:</label>
        <input
          type="text"
          name="itemName"
          value={newItem.itemName}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>
      <div>
        <label className={styles.label}>Item Price:</label>
        <input
          type="number"
          name="itemPrice"
          value={newItem.itemPrice}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>
      <div>
        <label className={styles.label}>Item Description:</label>
        <textarea
          name="itemDescription"
          value={newItem.itemDescription}
          onChange={handleInputChange}
          className={styles.textarea}
          required
        />
      </div>
      <div>
        <label className={styles.label}>Item Image URL:</label>
        <input
          type="text"
          name="itemImage"
          value={newItem.itemImage}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
      >
        Add Item
      </button>
      <button
        type="button"
        onClick={closeForm}
        className={styles.cancelButton}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddItemForm;
