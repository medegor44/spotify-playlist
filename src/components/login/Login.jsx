import React from "react";

import UserInfo from "../user-info/UserInfo";
import LoginButton from "./LoginButton";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [token] = useToken();

  if (token) return <UserInfo />;

  return <LoginButton />;
};

export default Login;
