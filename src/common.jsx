import { useSelector } from "react-redux";

const setLanguage = (language) => {
  try {
    localStorage.setItem("language", language);
    return true;
  } catch (error) {
    return false;
  }
};

const getLanguage = () => {
  const { language } = useSelector((state) => state.languageData);

  return language;

  // localStorage.getItem("language");
};

const getTokenFromLocalStorage = () => {
  let token = "";
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("authUser");
  }
  return token;
};

const getApisHeaders = () => {
  const token = getTokenFromLocalStorage();
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
};

const apisHeaders = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${getTokenFromLocalStorage()}`,
  },
};

export { setLanguage, getLanguage, getApisHeaders, apisHeaders, getTokenFromLocalStorage };
