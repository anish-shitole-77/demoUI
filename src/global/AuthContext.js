import React, { createContext, useState, useEffect, useContext } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
// const navigate = useNavigate();
  // Load from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    // console.log(user)
  };

  const logout = () => {
    localStorage.removeItem("user");
    //  localStorage.setItem('rememberChecked', JSON.stringify(false));
    setUser(null);
    //  navigate("/Home");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
