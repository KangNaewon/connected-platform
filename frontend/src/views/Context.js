import { createContext, useState } from "react";
import LoginPanel from "./LoginPanel";
import SelectPanel from "./SelectPanel";
import MainPanel from "./MainPanel";
import ProfilePanel from "./ProfilePanel";
import InfoPanel from "./InfoPanel";
import DashBoard from "./DashBoard";
import debugLog from "../libs/log";

export const PanelName = {
  login: 'login',
  select: 'select',
  main: 'main',
  profile: 'profile',
  info: 'info',
  dashboard: 'dashboard',
}

export const PanelContext = createContext(null);

export const Provider = props => {
  const initialPanelData = [{name: PanelName.login, data: {}}];
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

