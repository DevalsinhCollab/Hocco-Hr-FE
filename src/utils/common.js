export const getTokenFromLocalStorage = () => {
  let token = null;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("authUser");
  }
  return token;
};