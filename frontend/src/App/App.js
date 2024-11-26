import {useState} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {Panels} from '@enact/sandstone/Panels';
import {useBackHandler, useCloseHandler, useDocumentEvent} from './AppState';
import {isDevServe} from '../libs/utils';

import MainPanel from '../views/MainPanel';
import LoginPanel from '../views/LoginPanel';
import ProfilePanel from '../views/ProfilePanel';
import SelectPanel from '../views/SelectPanel';
import InfoPanel from '../views/InfoPanel';

import { useSelector } from 'react-redux';
import { panelIndex } from '../store/navigator';

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

const AppBase = (props) => {
	/* This is code from enact-template */
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants);

	const index = useSelector(panelIndex);

	return (
		<Panels
			{...props}
			index={index}
			skinVariants={skinVariants}
			onBack={handleBack}
			onClose={handleClose}
		>
			<LoginPanel/>
			<SelectPanel/>
			<MainPanel/>
			<ProfilePanel/>
			<InfoPanel/>
		</Panels>
	);
};

const App = ThemeDecorator(AppBase);
export default App;
