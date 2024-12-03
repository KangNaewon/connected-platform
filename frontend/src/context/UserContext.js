import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = props => {
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    profile_list: [],
    profile_id: null,
  });

  const setUserID = (id) => {
    setUserInfo((prev) => ({ ...prev, user_id: id }));
  };

  const setProfileID = (id) => {
    setUserInfo((prev) => ({ ...prev, profile_id: id }));
  };

  const setProfileList = (profile_list) => {
    setUserInfo((prev) => ({ ...prev, profile_list: profile_list }));
  };

  const setFavoriteList = (favorite_list) => {
    setUserInfo((prev) => ({ ...prev, favorite_list: favorite_list }));
  };

  const setVisitedList = (visited_list) => {
    setUserInfo((prev) => ({ ...prev, visited_list: visited_list }));
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserID,
        setProfileID,
        setProfileList,
        setFavoriteList,
        setVisitedList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};


export const useUserInfo = () => useContext(UserContext);