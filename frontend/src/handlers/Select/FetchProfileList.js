import { useCallback, useEffect, useState } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";

/**
 * Fetches a list of profiles for the given user.
 * @param {Object} userId - User-related data (userId and access_token).
 * @returns {Object} - An object containing profiles, loading state, and error state.
 */
const useFetchProfileList = (userId) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfiles = useCallback(async () => {
    try {
      const result = await request(`/user/${userId}/profile`, "GET", {}, 'user');

      debugLog("ProfileList[I]: fetched data", result);
      setProfiles(result.profiles);
      setLoading(false);
    } catch (err) {
      debugLog("ProfileList[E]: failed to fetch profiles", err);
      setError(err);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles, userId]);

  return { profiles, loading, error };
};

export default useFetchProfileList;
