import { useState, useEffect, useCallback } from "react";
import { getAccessTokenFromLocationHash } from "../spotify-client/spotify";
import { clearToken, getToken, setToken } from "../utils/tokenStorage";

const useToken = () => {
  const [authToken, setAuthToken] = useState(getToken());

  const clearAuthToken = useCallback(() => {
    clearToken();
    setAuthToken("");
  }, []);

  useEffect(() => {
    const token = getAccessTokenFromLocationHash(window.location.hash);
    if (token) {
      setToken(token);
      setAuthToken(token);
    }
  }, []);

  return [authToken, clearAuthToken];
};

export default useToken;
