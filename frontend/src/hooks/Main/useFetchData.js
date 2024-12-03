import { useState, useEffect } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";

const useFetchData = () => {
  const [mediaList, setMediaList] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request("/restaurant/recommendations", "GET");
        debugLog("MediaList[I]: Fetched data", response);
        setMediaList(response); 
      } catch (err) {
        debugLog("MediaList[E]: Failed to fetch data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { mediaList, loading, error };
};

export default useFetchData;
