import { useEffect, useState } from "react";
import { fetchUser } from "../utils/spotify";
import UnauthorizedError from "../utils/UnauthorizedError";

const useUserData = (token, onError) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authorize = async () => {
      if (!token) return; // maybe move to api calls

      try {
        const data = await fetchUser(token);
        setUserData(data);
      } catch (e) {
        if (e instanceof UnauthorizedError) onError();
      }
    };

    authorize();
  }, [token, onError]);

  return userData;
};

export default useUserData;
