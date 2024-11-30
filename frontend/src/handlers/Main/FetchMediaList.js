import { useState, useEffect } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";

/**
 * Custom Hook to fetch media list from the server
 * @returns {Object} { mediaList, loading, error }
 */
const FetchMediaList = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request("/restaurant/recommendations", "GET");
        debugLog("MediaList[I]: Fetched data", response);
        setMediaList(response); 
        setLoading(false);
      } catch (err) {
        debugLog("MediaList[E]: Failed to fetch data", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { mediaList, loading, error };
};

export default FetchMediaList;
