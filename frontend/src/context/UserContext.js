import React, { Children, createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = props => {
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    profile_list: [],
    profile_id: null,
  });

  const setUserID = (id) => {
    setUserInfo((prev) => ({...prev, user_id: id}));
  };

  const setProfileID = (id) => {
    setUserInfo((prev) => ({...prev, profile_id: id}));
  };

  const setProfileList = (profile_list) => {
    setUserInfo((prev) => ({...prev, profile_list: profile_list}));
  };

  return (
    <UserContext.Provider 
      value={{ 
        userInfo,
        setUserID,
        setProfileID,
        setProfileList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserContext);