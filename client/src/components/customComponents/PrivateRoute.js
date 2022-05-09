import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  useEffect(() => {
    const checkUser = () => {
      return user && user.isLogged
        ? true
        : Navigate("/login", {
            state: {
              notAuth: "Vous devez être connecté pour accèder à ce contenu",
            },
          });
    };
    checkUser();
  }, []);
  return <>{children}</>;
}
