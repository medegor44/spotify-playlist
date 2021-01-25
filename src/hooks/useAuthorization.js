import { useEffect, useState } from "react";
import { clearTokenInfo, getToken, setToken } from "../utils/tokenStorage";
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

      const user = await fetchUser(`${token}`);

      if (user.hasError) {
        setAuthorized(false);
        setUserData(null);
        clearTokenInfo();
        return;
      }

      setAuthorized(true);
      setUserData({ token, ...user });
    };

    const redirectToOrigin = () => {
      const currentUrl = window.location.href;
      window.location.href = currentUrl.slice(0, currentUrl.indexOf("#") + 1);
    };

    authorize();
    redirectToOrigin();
  }, []);

  return { userData, authorized };
};

export default useAuthorization;
