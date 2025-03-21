/* global ENACT_PACK_ISOMORPHIC */
import {createRoot, hydrateRoot} from 'react-dom/client';
import React from 'react';
import { PanelProvider } from './context/PanelContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

import App from './App/App';
import reportWebVitals from './reportWebVitals';

const appElement = (
	<PanelProvider>
		<UserProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</UserProvider>
	</PanelProvider>
);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(document.getElementById('root'), appElement);
	} else {
		createRoot(document.getElementById('root')).render(appElement);
	}
}

export default appElement;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
// Learn more: https://github.com/enactjs/cli/blob/master/docs/measuring-performance.md
reportWebVitals();