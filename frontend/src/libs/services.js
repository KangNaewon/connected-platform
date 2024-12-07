import request from '../libs/request';

export const mem = callInfo => request('luna://com.webos.memorymanager')(callInfo);

export const sam = callInfo =>
	request('luna://com.webos.applicationManager')(callInfo);

export const cnm = callInfo => request('luna://com.webos.connectionmanager')(callInfo);