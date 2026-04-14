import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = localStorage.getItem('userLogado');
    if (loggedUser) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userData = users.find(u => u.email === loggedUser);
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userData = users.find(u => u.email === email && u.senha === password);
    if (userData) {
      localStorage.setItem('userLogado', email);
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = (nome, email, senha) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      return false; // Email já existe
    }
    const newUser = { nome, email, senha };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('userLogado');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};