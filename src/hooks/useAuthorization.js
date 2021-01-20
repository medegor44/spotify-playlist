import { useState, useEffect } from "react";
import {
  getToken,
  getTokenExpirationDate,
  setTokenInfo,
  clearTokenInfo,
} from "../utils/tokenStorage";
import {
  fetchUser,
  getAccessTokenInfoFromLocationHash,
} from "../utils/spotify";

const useAuthorization = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authorize = async () => {
      if (!getToken()) {
        const { token, expiresIn } = getAccessTokenInfoFromLocationHash(
          window.location.hash
        );
        if (!token) return;
        setTokenInfo(token, Date.now() + Number(expiresIn));
      }

      const token = getToken();
      const expirationDate = getTokenExpirationDate();

      if (expirationDate <= Date.now()) {
        setAuthorized(false);
        setUserData(null);
        clearTokenInfo();
        return;
      }

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
