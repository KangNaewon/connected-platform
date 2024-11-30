import {Panel, Header} from '@enact/sandstone/Panels';
import {Row, Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { PanelContext, PanelName } from './Context';
import {PROJECT_NAME} from '../constants/strings';
import { request } from '../request/request';
import { useCallback, useContext, useEffect, useState } from 'react';
import debugLog from '../libs/log';

const SelectPanel = props => {
	const {data, ...rest} = props;
	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const {setPanelData} = useContext(PanelContext);

	debugLog('Select[I]', data);

	const fetchProfiles = useCallback(async () => {
		try {
			const result = await request(`/user/${data.userId}/profile`, 'GET', {
				headers: {
					Authorization: `Bearer ${data.access_token}`
				}
			});
			debugLog('Select[I]: fetched data', result);
			setProfiles(result.profiles);
			setLoading(false);
			debugLog('Select[I]: loaded profiles', profiles);
		} catch (error) {
			debugLog('Select[E]: fail to load profiles');
			setLoading(true);
		};
	}, [data]);

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

	if (loading) {
		return (
			<Panel>
				<Header title={PROJECT_NAME} centered/>
				<div>Loading...</div>
			</Panel>
		);
	}

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered />
			<Row>
				<Column align='center'>
					{profiles.map(profile => (
						<Cell key={profile.profile_id}>
							<Button onClick={() => handleProfileSelect(profile)}>
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