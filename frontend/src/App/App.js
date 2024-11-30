import {useContext, useState} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {Panels} from '@enact/sandstone/Panels';
import {useBackHandler, useCloseHandler, useDocumentEvent} from './AppState';
import {isDevServe} from '../libs/utils';

import { PanelContext } from '../context/PanelContext';
import { panelName } from '../constants/panelName';
import debugLog from '../libs/log';

import LoginPanel from '../views/LoginPanel';
import SelectPanel from '../views/SelectPanel';
import MainPanel from '../views/MainPanel';
import ProfilePanel from '../views/ProfilePanel';
import InfoPanel from '../views/InfoPanel';
import DashBoard from '../views/DashBoard';

/* istanbul ignore next */
if (isDevServe()) {
	window.webOSSystem = {
		highContrast: 'off',
		close: () => {},
		platformBack: () => {},
		PmLogString: () => {},
		screenOrientation: 'landscape',
		setWindowOrientation: () => {}
	};
}

const PanelMapper = item => {
  const {name, data} = item;
  debugLog('PanelMapper[I]', item);

  switch (name) {
    case panelName.login: 
      return <LoginPanel key={name} />;
    case panelName.select:
      return <SelectPanel key={name} data={data} />;
    case panelName.main:
      return <MainPanel key={name} data={data} />;
    case panelName.profile:
      return <ProfilePanel key={name} data={data} />;
    case panelName.info:
      return <InfoPanel key={name} data={data} />;
    case panelName.dashboard:
      return <DashBoard key={name} data={data} />;
    default:
      return <LoginPanel key={name}/>;
  }
}

const AppBase = props => {
	/* This is code from enact-template */
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants);

	const {panelData} = useContext(PanelContext);
	debugLog('APP[I]', panelData);
	
	return (
		<Panels
			{...props}
			index={panelData.length - 1}
			skinVariants={skinVariants}
			onBack={handleBack}
			onClose={handleClose}
		>
			{panelData.map(PanelMapper)}
		</Panels>
	);
};

const App = ThemeDecorator(AppBase);
export default App;
