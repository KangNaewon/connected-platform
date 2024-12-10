import { Panel, Header } from '@enact/sandstone/Panels';
import { Row, Column } from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { PROJECT_NAME } from '../constants/strings';
import debugLog from '../libs/log';
import Loading from '../components/Loading/Loading';
import useFetchProfileList from '../hooks/Select/useFetchProfileList';
import { useProfileSelect, useProfileAdd, useProfileDelete, useProfileEdit } from '../hooks/Select/useProfileSelect';
import Popup from '../components/Popup/Popup';
import { usePopup } from '../components/Popup/usePopup';
import { useUserInfo } from '../context/UserContext';
import { useState } from 'react';
import ProfileEdit from '../hooks/Select/ProfileEdit';
import Dropdown from '@enact/sandstone/Dropdown';

const SelectPanel = () => {
	const { userInfo } = useUserInfo();
	const [editField, setEditField] = useState(false);
	const [addField, setAddField] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState({});

	const { loading, error } = useFetchProfileList();
	const { isPopupOpen, handlePopupOpen, handlePopupClose, msg } = usePopup();
	const handleProfileSelect = useProfileSelect(handlePopupOpen);
	const handleProfileDelete = useProfileDelete(handlePopupOpen);
	const handleProfileAdd = useProfileAdd(handlePopupOpen, setAddField, setEditLoading);
	const handleProfieEdit = useProfileEdit(handlePopupOpen, setEditField, setEditLoading);

	const handleSelect = ({ selected }) => {
		console.log(selected);
		setSelectedProfile(userInfo.profile_list[selected]);
		console.log(selectedProfile);
	}

	const handleBtnClick = (action) => {
		if (!selectedProfile || !selectedProfile.profile_id) {
			handlePopupOpen('Please select a profile first.');
			return;
		}
		action(selectedProfile.profile_id);
	};

	if (loading || editLoading) return <Loading />;
	if (error) {
		debugLog('Select[E]', { error: error });
		handlePopupOpen('fail to load profiles');
	}

	debugLog('Select[I]: profile list', { profiles: userInfo.profile_list });

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered />
			<Column align='center'>
				<Dropdown
					title='profiles'
					placeholder='choose your profile'
					onSelect={handleSelect}
					size='large'
				>
					{userInfo.profile_list.map((profile) => profile.profile_name)}

				</Dropdown>
				{editField && <ProfileEdit onComplete={handleProfieEdit} oldProfile={selectedProfile.profile_id} />}
				{addField && <ProfileEdit onComplete={handleProfileAdd} />}

				<Row>
					<Button icon='edit' size='small' onClick={() => {
						if (!selectedProfile || !selectedProfile.profile_id) {
							handlePopupOpen('Please select a profile to edit.');
							return;
						}
						setEditField(true);
					}}
					/>
					<Button icon='trash' size='small' onClick={() => handleBtnClick(handleProfileDelete)} />
					<Button icon='plus' size='small' onClick={() => setAddField(true)} />
					<Button icon='check' size='small' onClick={() => handleBtnClick(handleProfileSelect)} />
				</Row>

			</Column>
			<Popup
				isPopupOpen={isPopupOpen}
				handlePopupClose={handlePopupClose}
				msg={msg}
			/>
		</Panel>
	)
};

export default SelectPanel;