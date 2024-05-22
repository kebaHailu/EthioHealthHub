import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import getAuth from "../../../util/Auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch("http://localhost:8000/auth/users/me/", {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
        // setIsLogged(true);
        // setIsChecked(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // setIsChecked(true);
      }
    };

    fetchData();
  }, []);
  console.log(userData);

  useEffect(() => {
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      console.log(response);
      if (response) {
        setIsLogged(true);
        if (roles && roles.length > 0 && roles.includes(userData.user_role)) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [userData, roles]);

  console.log("isChecked:", isChecked);
  console.log("isLogged:", isLogged);
  console.log("isAuthorized:", isAuthorized);

  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }
  return children;
};

export default PrivateAuthRoute;
