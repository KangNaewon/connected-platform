import {useState} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {Panels, Routable, Route} from '@enact/sandstone/Panels';
import {useBackHandler, useCloseHandler, useDocumentEvent} from './AppState';
import {isDevServe} from '../libs/utils';
import * as PATH from '../constants/path';
import {useSelector} from 'react-redux';

import MainPanel from '../views/MainPanel';
import LoginPanel from '../views/LoginPanel';
import ProfilePanel from '../views/ProfilePanel';
import SelectPanel from '../views/SelectPanel';
import VideoPanel from '../views/VideoPanel';

/* istanbul ignore next*/
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

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const _App = (props) => {
	/* This is code from enact-template */
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants);

	/* For routing */
	const path = useSelector((state) => state.navigation.path);

	return (
		<RoutablePanels
			{...props}
			path={path}
			skinVariants={skinVariants}
			onBack={handleBack}
			onClose={handleClose}
		>
			<Route path={PATH.login} component={LoginPanel} >
				<Route path={PATH.select_profile} component={SelectPanel} />
			</Route>
			<Route path={PATH.select_profile} component={SelectPanel} >
				<Route path={PATH.main} component={MainPanel} />
			</Route>
			<Route path={PATH.main} component={MainPanel} >
				<Route path={PATH.profile} component={ProfilePanel} />
				<Route path={PATH.login} component={LoginPanel} />
				<Route path={PATH.select_profile} component={SelectPanel} />
				<Route path={PATH.video} component={VideoPanel} />
			</Route>
			<Route path={PATH.profile} component={ProfilePanel} /> 
			<Route path={PATH.video} component={VideoPanel} />
		</RoutablePanels>
	);
};

const App = ThemeDecorator(_App);
export default App;
