import {Panel, Header} from '@enact/sandstone/Panels';
import {Row, Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { PanelContext, PanelName } from './Context';
import {PROJECT_NAME} from '../constants/strings';
import { request } from '../request/request';
import { useCallback, useContext, useEffect, useState } from 'react';

const SelectPanel = props => {
	const {data} = props.data;
	const {profiles, setProfiles} = useState();
	const {setPanelData} = useContext(PanelContext);

	const fetchProfiles = useCallback(async () => {
		try {
			const result = await request('/user/${data.userId}/profile', 'GET', {
				headers: {
					Authorization: `Bearer ${data.access_token}`
				}
			});
			setProfiles(result.profiles || []);
		} catch (error) {
			console.error('Fail to fetch profiles', error);
		};
	}, [data, setProfiles]);

	useEffect(() => {
		fetchProfiles();
	}, [fetchProfiles]);

	const handleProfileSelect = useCallback(profile => {
		setPanelData(prev => [
			...prev,
			{
				name: PanelName.main,
				data: {
					userId: data.userId,
					access_token: data.access_token,
					refresh_token: data.refresh_token,
					profiles: profiles,
					profile_id: profile.profile_id
				}
			}
		]);
	}, [data, profiles, setPanelData]);

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered />
			<Row>
				<Column>
					{profiles.map(profile => (
						<Cell key={profile.profile_id}>
							<Button onClick={handleProfileSelect(profile)}>
								{profile.name}
							</Button>
						</Cell>
					))}
				</Column>
			</Row>
		</Panel>
	)
}

export default SelectPanel;