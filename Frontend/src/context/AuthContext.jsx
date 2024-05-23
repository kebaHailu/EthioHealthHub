import React, { useState, useEffect, useContext } from "react";
import getAuth from "../../util/Auth";

const AuthContext = React.createContext();
const UserRoleContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useUserRole = () => {
  return useContext(UserRoleContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const value = {
    isLogged,
    setIsLogged,
  };

  useEffect(() => {
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      if (response) {
        setIsLogged(true);
      }
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUserRole("Patient");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        const userData = await response.json();
        setUserRole(userData.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const userRoleValue = {
    userRole,
  };

  return (
    <UserRoleContext.Provider value={userRoleValue}>
      {children}
    </UserRoleContext.Provider>
  );
};
