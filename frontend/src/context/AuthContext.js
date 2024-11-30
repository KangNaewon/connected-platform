import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState({
    access_token: null,
    refresh_token: null,
    profile_access_token: null,
  });

  const setUserAccessToken = (token) => {
    setAuthTokens((prev) => ({...prev, access_token: token}));
  };

  const setProfileAccessToken = (token) => {
    setAuthTokens((prev) => ({...prev, access_token: token}));
  };

  const setRefreshToken = (token) => {
    setAuthTokens((prev) => ({...prev, refresh_token: token}));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authTokens,
        setUserAccessToken,
        setProfileAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);