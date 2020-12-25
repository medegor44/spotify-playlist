import React, { useState, useEffect, useContext } from "react";
import UserContext from "./contexts/UserContext";
import "./css/SpotifyUsername.css";

const SpotifyUsername = () => {
  const [error, setError] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    if (!user.token) {
      setError("Cannot read access token");
      return;
    }

    if (user.hasError) setError(user.message);
  }, [user]);

  if (error) return <p>Error occurred while fetching name: {error}</p>;

  if (user)
    return (
      <div className="profileContainer">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            className="centerСropped rounded"
            alt=""
          />
        ) : (
          <h1 className="profileLetter rounded">{user.username[0]}</h1>
        )}
        <span className="username">{user.username}</span>
      </div>
    );

  return <h1>Loading...</h1>;
};

export default SpotifyUsername;
