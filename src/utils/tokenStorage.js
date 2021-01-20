export const setTokenInfo = (token, expirationDate) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("expirationDate", expirationDate);
};

export const getToken = () => sessionStorage.getItem("token");
export const getTokenExpirationDate = () =>
  sessionStorage.getItem("expirationDate");
export const clearTokenInfo = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("expirationDate");
};
