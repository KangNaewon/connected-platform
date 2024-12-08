import {Panel, Header} from '@enact/sandstone/Panels';
import {Row, Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import {PROJECT_NAME} from '../constants/strings';
import debugLog from '../libs/log';
import Loading from '../components/Loading/Loading';
import useFetchProfileList from '../hooks/Select/useFetchProfileList';
import {useProfileSelect, useProfileAdd, useProfileDelete, useProfileEdit} from '../hooks/Select/useProfileSelect';
import Popup from '../components/Popup/Popup';
import { usePopup } from '../components/Popup/usePopup';
import { useUserInfo } from '../context/UserContext';
import BodyText from '@enact/sandstone/BodyText';
import { useState } from 'react';
import ProfileEdit from '../hooks/Select/ProfileEdit';

const SelectPanel = () => {
	const {userInfo} = useUserInfo();
	const [editField, setEditField] = useState(false);
	const [addField, setAddField] = useState(false);
	const [editLoading, setEditLoading] = useState(false);

	const {loading, error} = useFetchProfileList();
	const { isPopupOpen, handlePopupOpen, handlePopupClose, msg } = usePopup();
	const handleProfileSelect = useProfileSelect(handlePopupOpen);
	const handleProfileDelete = useProfileDelete(handlePopupOpen);
	const handleProfileAdd = useProfileAdd(handlePopupOpen, setAddField, setEditLoading);
	const handleProfieEdit = useProfileEdit(handlePopupOpen, setEditField, setEditLoading);

	if (loading || editLoading) return <Loading />;
	if (error) {
		debugLog('Select[E]', {error: error});
		handlePopupOpen('fail to load profiles');
	}
	
	debugLog('Select[I]: profile list',{profiles: userInfo.profile_list});

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered />
			<Row>
				<Cell size={"33%"} />
				<Column align='center'>
					{userInfo.profile_list.map((profile) => (
						<Cell key={profile.profile_id}>
							<Row >
								<BodyText centered onClick={() => handleProfileSelect(profile.profile_id)} >
									{profile.profile_name}
								</BodyText>
								{editField && <ProfileEdit onComplete={handleProfieEdit} oldProfile={profile.profile_name}/>}
								<Button icon='edit' size='small' onClick={() => setEditField(true)}/>
								<Button icon='trash' size='small' onClick={() => handleProfileDelete(profile.profile_id)}/>
							</Row>
						</Cell>
					))}
					<Cell>
						<Button icon='plus' onClick={() => setAddField(true)} />
						{addField && <ProfileEdit onComplete={handleProfileAdd}/>}
					</Cell>
					
				</Column>
			</Row>
			<Popup 
				isPopupOpen={isPopupOpen}
				handlePopupClose={handlePopupClose}
				msg={msg}
			/>
		</Panel>
	)
};

export default SelectPanel;