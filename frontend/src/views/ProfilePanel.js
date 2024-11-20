import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';

const ProfilePanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Hello world!" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default ProfilePanel;