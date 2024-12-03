import { useCallback, useEffect, useState } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";
import { useAuth } from "../../context/AuthContext";
import { useUserInfo } from "../../context/UserContext";

const useFetchProfileList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authTokens} = useAuth();
  const {setProfileList, userInfo} = useUserInfo();

  const fetchProfiles = useCallback(async () => {
    try {
      const result = await request(`/user/${userInfo.user_id}/profile`, "GET", {}, authTokens.access_token);

      debugLog("ProfileList[I]", result);
      setProfileList(result.profiles);
    } catch (err) {
      debugLog("ProfileList[E]: failed to fetch profiles", {error: err});
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authTokens.access_token, userInfo.user_id, setProfileList]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return { loading, error };
};

export default useFetchProfileList;
