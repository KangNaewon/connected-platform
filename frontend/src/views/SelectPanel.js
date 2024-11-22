import {Panel, Header} from '@enact/sandstone/Panels';
import {Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { useSelector } from 'react-redux';

import {PROJECT_NAME} from '../constants/strings';
import {useSelectProfile} from './LoginState';

const SelectPanel = () => {
	const profiles = useSelector((state) => state.user.profiles);
	const {handleSelectProfile} = useSelectProfile();

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered={true} />
			<Column align='center'>
				{profiles.map((profile) => (
					<Cell key={profile.profile_id} size={180}>
						<Button 
							key={profile.key}
							icon='profile'
							color='red'
							onClick={() => handleSelectProfile(profile.id)}
						>
							{profile.name}
						</Button>
					</Cell>
				))}
			</Column>
		</Panel>
	)
}

export default SelectPanel;