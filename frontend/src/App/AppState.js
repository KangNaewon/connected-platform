import {useCallback, useEffect} from 'react';
import * as domEvents from '../constants/domEvents';
import debugLog from '../libs/log';
import {closeApp, isTVBrowser, reload} from '../libs/utils';
import { useProcStat } from '../hooks/useTVData';
import { useSelector, useDispatch } from 'react-redux';
import { navigate, selectPanelName } from '../store/navigator';

const useVisibleChangeHandler = () =>
	useCallback(() => {
		const {hidden} = document;
		debugLog('VISIBILITY_CHANGE', {hidden});
	}, []);

const useLocaleChangeHandler = () =>
	useCallback(() => {
		debugLog('LOCALE_CHANGE', {});
		reload();
	}, []);

const useHighContrastChangeHandler = setSkinVariants =>
	useCallback(() => {
		debugLog('HIGH_CONTRAST_CHANGE', {});
		setSkinVariants({
			highContrast: window.webOSSystem.highContrast === 'on'
		});
	}, [setSkinVariants]);

export const useBackHandler = () => {
	const dispatch = useDispatch();
	const panelName = useSelector(selectPanelName);

	return useCallback(() => {
		debugLog('BACK[I]', {currentPanel: panelName});

		let backPanel = null;
		switch (backPanel) {
			case 'select':
				backPanel = 'login'; break;
			case 'profile':
			case 'video':
			case 'dashboard':
				backPanel = 'main'; break;
			default:
				backPanel = null;
		}

		if (backPanel) {
			dispatch(navigate({panelName: backPanel}));
		}
	}, [dispatch, panelName])
}

export const useCloseHandler = () =>
	useCallback(() => {
		debugLog('CLOSE_X[I]', {});
		closeApp();
	}, []);

// Add all document events here
export const useDocumentEvent = setSkinVariants => {
	const handleVisibilitychange = useVisibleChangeHandler();
	const handleHighContrastChange =
		useHighContrastChangeHandler(setSkinVariants);
	const handleLocaleChange = useLocaleChangeHandler();

	useEffect(() => {
		const events = {
			[domEvents.VISIBILITY_CHANGE]: handleVisibilitychange,
			[domEvents.WEBOS_HIHG_CONTRAST_CHANGE]: handleHighContrastChange,
			[domEvents.WEBOS_LOCALE_CHANGE]: handleLocaleChange
		};

		if (isTVBrowser()) {
			for (const event in events) {
				document.addEventListener(event, events[event]);
			}
		}

		return () => {
			if (isTVBrowser()) {
				for (const event in events) {
					document.removeEventListener(event, events[event]);
				}
			}
		};
	}, [handleVisibilitychange, handleHighContrastChange, handleLocaleChange]);
};

// Add functions to subscribe luna APIs for general usage here
export const useSubscriptions = () => {
	useProcStat();
};
