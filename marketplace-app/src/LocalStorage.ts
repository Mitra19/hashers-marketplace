const REGISTERED_USERS_KEY = "registered_users";
const ACTIVE_USER = "active_user";
const ITEMS = "items";

export interface IUserModel {
  name: string;
  username: string;
  password: string;
}
export interface ItemsToSell {
  itemName: string;
  itemPrice: number;
  itemDescription: string;
  itemImage: string;
  rating?: number;
  owner?: string;
}
const addUser = (user: IUserModel) => {
  var usersStr = localStorage.getItem(REGISTERED_USERS_KEY) || "[]";
  var users = JSON.parse(usersStr) as IUserModel[];
  users.push(user);

  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};
const addItem = (item: ItemsToSell) => {
  var itemsStr = localStorage.getItem(ITEMS) || "[]";
  var items = JSON.parse(itemsStr) as ItemsToSell[];

  const activeUserStr = localStorage.getItem(ACTIVE_USER);
  if(activeUserStr) {
    const activeUser = JSON.parse(activeUserStr) as IUserModel;
    item.owner = activeUser.username;
  }
  item.rating = 0;
  items.push(item);
  localStorage.setItem(ITEMS, JSON.stringify(items));
}

const updateItemRating = (itemName: string, newRating: number) => {
  var itemStr = localStorage.getItem(ITEMS) || "[]";
  var items = JSON.parse(itemStr) as ItemsToSell[];

  const item = items.find((x) => x.itemName == itemName);
  if(item) {
    item.rating = newRating;
    localStorage.setItem(ITEMS, JSON.stringify(items));
    return true;
  }
  return false;
}

const isUsernameExists = (username: string): boolean => {
  var usersStr = localStorage.getItem(REGISTERED_USERS_KEY) || "[]";
  var users = JSON.parse(usersStr) as IUserModel[];

  var user = users.find((x) => x.username == username);
  return user != null;
};

const getUser = (username: string, password: string) => {
  var usersStr = localStorage.getItem(REGISTERED_USERS_KEY) || "[]";
  var users = JSON.parse(usersStr) as IUserModel[];

  return users.find((x) => x.username == username && x.password == password);
};

const updateActiveUser = (user: IUserModel) => {
  localStorage.setItem(ACTIVE_USER, JSON.stringify(user));
};

const getActiveUser = () => {
  var usersStr = localStorage.getItem(ACTIVE_USER) || null;
  if (usersStr == null) return null;

  var user = JSON.parse(usersStr) as IUserModel;
  return user;
};
const getItems = () => {
  var itemsStr = localStorage.getItem(ITEMS) || "[]";
  if (itemsStr == "[]") return null;

  var items = JSON.parse(itemsStr) as ItemsToSell[];
  return items;
}

const removeActiveUser = () => {
  localStorage.removeItem(ACTIVE_USER);
};

export {
  REGISTERED_USERS_KEY,
  addUser,
  getUser,
  isUsernameExists,
  updateActiveUser,
  getActiveUser,
  removeActiveUser,
  addItem,
  updateItemRating,
  getItems
};
