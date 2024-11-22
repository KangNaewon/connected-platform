import { useDispatch } from "react-redux";
import debugLog from "../libs/log";
import { useCallback } from "react";
import { navigate } from '../store/navigator';

export const useNavigate = () => {
  const dispatch = useDispatch();

  return useCallback((panelName, panelData=null) => {
    debugLog('NAVIGATE[I]', { panelName, panelData });
    dispatch(navigate({ panelName, panelData }));
  }, [dispatch]);
};