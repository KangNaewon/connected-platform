// This is subscribe APIs.
import { useEffect, useRef, useState } from 'react';

import debugLog from '../libs/log';
import { mem, cnm } from '../libs/services';

export const useMonitorActivity = () => {
	const ref = useRef(null);
	const [value, setValue] = useState({ return: false });


	useEffect(() => {
		if (!ref.current) {
			debugLog('GET_MONITOR_ACTIVITY[R]');
			ref.current = cnm({
				method: 'monitorActivity',
				parameters: {
					subscribe: true
				},
				onSuccess: res => {
					debugLog('GET_MONITOR_ACTIVITY[S]', res);
					setValue((prev) => ({ ...prev, ...res }));
				},
				onFailure: err => {
					debugLog('GET_MONITOR_ACTIVITY[F]', err);
				}
			});
		}
		return () => {
			if (ref.current) {
				ref.current.cancel();
				ref.current = null;
			}
		};
	}, []);

	return value;
}

// example:
//  luna://com.webos.memorymanager/getProcStat '{"subscribe":true}'

export const useProcStat = () => {
	const ref = useRef(null);
	const [value, setValue] = useState({ returnValue: false });

	console.log('ref.current before subscription:', ref.current);
	useEffect(() => {
		console.log('Setting up subscription');
		if (!ref.current) {
			debugLog('GET_PROC_STAT[R]', {});
			ref.current = mem({
				method: 'getProcStat',
				parameters: {
					subscribe: true,
				},
				onSuccess: res => {
					debugLog('GET_PROC_STAT[S]', res);
					setValue((prev) => ({ ...prev, ...res }));
				},
				onFailure: err => {
					debugLog('GET_PROC_STAT[F]', err);
				}
			});
		}

		return () => {
			if (ref.current) {
				ref.current.cancel();
				ref.current = null;
			}
		};
	}, []);

	return value;
};

export const useUnitList = () => {
	const ref = useRef(null);
	const [value, setValue] = useState({ returnValue: false });

	useEffect(() => {
		if (!ref.current) {
			debugLog('GET_UNIT_LIST[R]', {});
			ref.current = mem({
				method: 'getUnitList',
				parameters: {
					subscribe: true
				},
				onSuccess: res => {
					debugLog('GET_UNIT_LIST[S]', res);
					setValue((prev) => ({ ...prev, ...res }));
				},
				onFailure: err => {
					debugLog('GET_UNIT_LIST[F]', err);
				}
			});
		}

		return () => {
			if (ref.current) {
				ref.current.cancel();
				ref.current = null;
			}
		};
	}, []);

	return value;
};