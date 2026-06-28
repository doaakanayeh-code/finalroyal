import { Outlet, useNavigate, Navigate } from "react-router-dom";
import cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../Api/axios";
import Loading from "../Allcomponent/Loading";
import Err404 from "../Component/404";

export default function RequireAuth({ allowedrole }) {
  const navigate = useNavigate();
  const cookies = cookie();
  const token = cookies.get("Bearer");

  const [isLoading, setIsLoading] = useState(!!token); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      Axios.get("/user")
        .then((res) => {
          setUser(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          navigate("/login", { replace: true });
        });
    }
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (user && allowedrole.includes(user.role)) {
    return <Outlet />;
  }

  return <Err404 />;
}