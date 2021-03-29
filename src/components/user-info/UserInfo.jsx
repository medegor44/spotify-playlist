import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import "../../css/SpotifyUsername.css";

const UserInfo = () => {
  const [error, setError] = useState("");
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (!userData) return;

    if (userData.hasError) setError(userData.message);
  }, [userData]);

  if (error) return <p>Error occurred while fetching name: {error}</p>;

  if (userData)
    return (
      <div className="profileContainer">
        {userData.profileImage ? (
          <img
            src={userData.profileImage}
            className="centerСropped profilePic rounded"
            alt=""
          />
        ) : (
          <h1 className="profileLetter profilePic rounded">
            {userData.username[0]}
          </h1>
        )}
        <span className="username">{userData.username}</span>
      </div>
    );

  return <h1>Loading...</h1>;
};

export default UserInfo;
