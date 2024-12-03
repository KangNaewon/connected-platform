import { useContext } from "react";
import { PanelContext } from "../context/PanelContext";

export const useNavigate = () => {
  const {setPanelData} = useContext(PanelContext);
  const navigate = (name, data={}) => {
    setPanelData((prev) => [
      ...prev, 
      {
        name: name,
        data: data,
      }
    ]);
  };

  return navigate;
}

export const usePanelData = () => {
  const { panelData } = useContext(PanelContext);
  return panelData[panelData.length - 1]?.data || {};
};
