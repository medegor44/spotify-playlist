import queryString from "query-string";
import { CLIENT_ID } from "./constants";

export const generateAuthUrl = (redirectUri) => {
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "token",
    scope: "user-library-read",
  };

  const queryStringParams = queryString.stringify(params);
  return `https://accounts.spotify.com/authorize?${queryStringParams}`;
};

export const fetchSpotifyUsername = async (token) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status >= 400) return await parseError(response);

    const data = await response.json();

    return { username: data["display_name"] };
  } catch (e) {
    return { message: "network error" };
  }
};

const parseError = async (response) => {
  const data = await response.json();

  if (data["error"]) return { message: data["error"]["message"] };
  return null;
};
