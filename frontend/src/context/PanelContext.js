import { createContext, useState } from "react";
import { panelName } from "../constants/panelName";

export const PanelContext = createContext(null);

export const PanelProvider = props => {
  const initialPanelData = [{name: panelName.dashboard, data: {}}];
  const [panelData, setPanelData] = useState(initialPanelData);

  return (
    <PanelContext.Provider
      value={{
        panelData,
        setPanelData,
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
};

