import { useDispatch } from "react-redux";
import debugLog from "../libs/log";
import { useCallback } from "react";
import { navigate } from '../store/navigation';

export const useNavigate = () => {
  const dispatch = useDispatch();

  return useCallback((path) => {
    debugLog('NAVIGATE[I]', {path});
    dispatch(navigate(path));
  }, [dispatch]);
};