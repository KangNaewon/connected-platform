import {Panel, Header} from '@enact/sandstone/Panels';
import {Column, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import { useSelector } from 'react-redux';

import {PROJECT_NAME} from '../constants/strings';
import {useNavigate} from '../hooks/useNavigate';
import * as PATH from '../constants/path';

const SelectPanel = () => {
	const { data: profiles } = useSelector((state) => state.navigation);
	const navigate = useNavigate();

	const handleSelect = (profile) => {
		console.log("handle select")
	};

	return (
		<Panel>
			<Header title={PROJECT_NAME} centered={true} />
			<Column align='center'>
				{profiles.map((profile) => (
					<Cell key={profile.key} size={180}>
						<Button 
							key={profile.key}
							icon='profile'
							color='red'
							onClick={handleSelect}
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