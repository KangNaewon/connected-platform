import {useCallback, useState} from 'react';

export const usePopup = () => {
	const [isPopupOpen, openPopup] = useState(false);
  const [msg, setMsg] = useState('');

	const handlePopupOpen = useCallback((msg) => {
    setMsg(msg);
		openPopup(true);
	}, []);

	const handlePopupClose = useCallback(() => {
    setMsg('');
		openPopup(false);
	}, []);

	return {isPopupOpen, handlePopupOpen, handlePopupClose, msg};
};
