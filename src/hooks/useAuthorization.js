import { useEffect, useState } from "react";
import { clearToken, getToken, setToken } from "../utils/tokenStorage";
import { fetchUser, getAccessTokenFromLocationHash } from "../utils/spotify";

const useAuthorization = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  const handleError = () => {
    clearToken();
  };

  const setErrorTrue = () => setError(true);

  useEffect(() => {
    const authorize = async () => {
      if (!getToken()) {
        const token = getAccessTokenFromLocationHash(window.location.hash);

        if (!token) return;

        setToken(token);
      }

      const token = getToken();

      try {
        const user = await fetchUser(`${token}`);
        setAuthorized(true);
        setUserData({ token, ...user });
      } catch (e) {
        setError(true);
      }
    };

    const redirectToOrigin = () => {
      const currentUrl = window.location.href;
      window.location.href = currentUrl.slice(0, currentUrl.indexOf("#") + 1);
    };

    authorize();
    redirectToOrigin();
  }, []);

  return { userData, authorized, error, handleError, setErrorTrue };
};

export default useAuthorization;
