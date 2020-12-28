import { useState, useEffect } from "react";
import { getToken, setToken } from "../utils/tokenStorage";
import { fetchUser, getAccessTokenFromLocationHash } from "../utils/spotify";

const useAuthorization = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authorize = async () => {
      if (!getToken()) {
        const token = getAccessTokenFromLocationHash(window.location.hash);
        if (!token) return;
        setToken(token);
      }

      const token = getToken();
      setAuthorized(true);

      const user = await fetchUser(`${token}`);

      if (user.hasError) {
        setAuthorized(false);
        return;
      }
      setUserData({ token, ...user });
    };

    authorize();
  }, []);

  return { userData, authorized };
};

export default useAuthorization;
