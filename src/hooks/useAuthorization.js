import { useEffect, useState } from "react";
import { clearToken, getToken, setToken } from "../utils/tokenStorage";
import { fetchUser, getAccessTokenFromLocationHash } from "../utils/spotify";

const redirectToOrigin = () => {
  const currentUrl = window.location.href;
  window.location.href = currentUrl.slice(0, currentUrl.indexOf("#") + 2);
};

const useAuthorization = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authorizationError, setAuthorizationError] = useState(null);

  const handleError = () => {
    clearToken();
  };

  useEffect(() => {
    const authorize = async () => {
      if (!getToken()) {
        const token = getAccessTokenFromLocationHash(window.location.hash);

        if (!token) return;

        setToken(token);

        redirectToOrigin();
      }

      const token = getToken();

      try {
        setAuthorized(true);
        const user = await fetchUser(`${token}`);
        setUserData({ token, ...user });
      } catch (e) {
        setAuthorizationError(e);
      }
    };

    authorize();
  }, [authorized]);

  return {
    userData,
    authorized,
    authorizationError,
    handleError,
    setAuthorizationError,
  };
};

export default useAuthorization;
