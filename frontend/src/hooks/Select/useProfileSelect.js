import { useCallback } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";
import { panelName } from "../../constants/panelName";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserInfo } from "../../context/UserContext";

const useProfileSelect = (handlePopupOpen) => {
  const { authTokens, setProfileAccessToken } = useAuth(); 
  const navigate = useNavigate();
  const {setProfileID} = useUserInfo();

  return useCallback(
    async (profileId) => {
      try {
        const response = await request(`/profile/switch/${profileId}`, "POST", {}, {}, authTokens.access_token);

        debugLog("ProfileSelect[I]: switched profile", response);

        setProfileAccessToken(response.token);
        setProfileID(profileId);
        navigate(panelName.main, {});

      } catch (error) {
        debugLog("ProfileSelect[E]: failed to switch profile", {error: error});
        handlePopupOpen("Invalid Profile")
      }
    },
    [authTokens.access_token, navigate, setProfileAccessToken, setProfileID, handlePopupOpen]
  );
};

export default useProfileSelect;
