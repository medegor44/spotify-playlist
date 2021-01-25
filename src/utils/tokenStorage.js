export const setToken = (token) => sessionStorage.setItem("token", token);

export const getToken = () => sessionStorage.getItem("token");

export const clearTokenInfo = () => sessionStorage.removeItem("token");
