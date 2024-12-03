import {Panel, Header} from '@enact/sandstone/Panels';
import {Row, Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import {PROJECT_NAME} from '../constants/strings';
import debugLog from '../libs/log';
import Loading from '../components/Loading/Loading';
import useFetchProfileList from '../hooks/Select/useFetchProfileList';
import useProfileSelect from '../hooks/Select/useProfileSelect';
import Popup from '../components/Popup/Popup';
import { usePopup } from '../components/Popup/usePopup';
import { useUserInfo } from '../context/UserContext';

const SelectPanel = () => {
	const {loading, error} = useFetchProfileList();
	const { isPopupOpen, handlePopupOpen, handlePopupClose, msg } = usePopup();
	const handleProfileSelect = useProfileSelect(handlePopupOpen);
	const {userInfo} = useUserInfo();

	if (loading) return <Loading />;
	if (error) {
		debugLog('Select[E]', {error: error});
		handlePopupOpen('fail to load profiles');
	}
	
	debugLog('Select[I]: profile list', userInfo.profile_list);

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered />
			<Row>
				<Column align='center'>
					{userInfo.profile_list.map(profile => (
						<Cell key={profile.profile_id}>
							<Button onClick={() => handleProfileSelect(profile)}>
								{profile.name}
							</Button>
						</Cell>
					))}
				</Column>
			</Row>
			<Popup 
				isPopupOpen={isPopupOpen}
				handlePopupClose={handlePopupClose}
				msg={msg}
			/>
		</Panel>
	)
}

export default SelectPanel;