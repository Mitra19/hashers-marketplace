import {type FC, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';

interface User {
  id: string;
  username: string;
  password: string;
}

const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleRegister = (username: string, password: string) => {
    if (users.find((user) => user.username === username)) {
      alert('User already exists!');
      return;
    }
    const newUser = { id: Date.now().toString(), username, password };
    setUsers([...users, newUser]);
    alert('Registration successful!');
    
  };

  const handleLogin = (username: string, password: string) => {
    console.log("Exsisting users: ", users);
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      alert('Login successful!');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/welcome" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/welcome"
          element={
            currentUser ? <Welcome username={currentUser.username} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
