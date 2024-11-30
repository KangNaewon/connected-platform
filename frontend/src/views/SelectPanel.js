import {Panel, Header} from '@enact/sandstone/Panels';
import {Row, Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { PanelContext } from '../context/PanelContext';
import {PROJECT_NAME} from '../constants/strings';
import { useContext } from 'react';
import debugLog from '../libs/log';
import Loading from '../components/Loading/Loading';
import useFetchProfileList from '../handlers/Select/FetchProfileList';
import ProfileSelectHandler from '../handlers/Select/ProfileSelectHandler';

const SelectPanel = props => {
	const {data, ...rest} = props;
	const {profiles, loading, error} = useFetchProfileList(data.userId);
	const handleProfileSelect = ProfileSelectHandler(data.userId);

	if (loading) return <Loading />;
	if (error) {
		debugLog('Select[E]: fail to fetch profile list');
	}

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered />
			<Row>
				<Column align='center'>
					{profiles.map(profile => (
						<Cell key={profile.profile_id}>
							<Button onClick={() => handleProfileSelect(profiles, profile)}>
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