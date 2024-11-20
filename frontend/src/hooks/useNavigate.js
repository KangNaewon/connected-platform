import { useDispatch } from "react-redux";
import debugLog from "../libs/log";
import { useCallback } from "react";
import { navigate } from '../store/navigation';

export const useNavigate = () => {
  const dispatch = useDispatch();

  return useCallback((path, data=null) => {
    debugLog('NAVIGATE[I]', { path, data });
    dispatch(navigate({ path, data }));
  }, [dispatch]);
};