import React from "react";

import Username from "./Username";
import LoginButton from "./LoginButton";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [token] = useToken();

  if (token) return <Username />;

  return <LoginButton />;
};

export default Login;
