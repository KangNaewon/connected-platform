import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';
import HLSVideo from '../components/HLSVideo';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="HLS Video" type="compact" />
			<HLSVideo src="http://localhost:6060/videos/test/index.m3u8" />
		</Panel>
	)
});

export default MainPanel;
