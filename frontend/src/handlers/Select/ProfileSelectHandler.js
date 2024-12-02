import { useCallback, useContext } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";
import { panelName } from "../../constants/panelName";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "../../hooks/useNavigate";
import { PanelContext } from "../../context/PanelContext";

/**
 * Handles profile selection and switches to the main panel.
 * @param {Function} setPanelData - Function to update panel state.
 * @param {string} userId - The ID of the user.
 * @returns {Function} - Profile selection handler.
 */
const ProfileSelectHandler = (userId) => {
  const { setProfileAccessToken } = useAuth(); 
  const navigate = useNavigate();
  const {setPanelData} = useContext(PanelContext);

  return useCallback(
    async (profiles, profileId) => {
      try {
        const response = await request(`/profile/switch/${profileId}`, "POST", {}, 'user');

        debugLog("ProfileSelect[I]: switched profile", response);

        setProfileAccessToken(response.token);
        navigate(panelName.main, {userId: userId, profiles:profiles, profileId: profileId});

      } catch (error) {
        debugLog("ProfileSelect[E]: failed to switch profile", {error: error});
      }
    },
    [setProfileAccessToken, setPanelData, userId]
  );
};

export default ProfileSelectHandler;
