import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';
import HLSVideo from '../components/HLSVideo';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => {
		let setQuality;
		
		return (
			<Panel {...props}>
				<Header title="HLS Video" type="compact" />
				<HLSVideo src="http://localhost:6060/videos/test/master.m3u8" onQualityChange={(setQualityCallback) => {setQuality = setQualityCallback;}}/>
				<div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
					<Button onClick={() => setQuality(0)}>360p</Button>
					<Button onClick={() => setQuality(1)}>720p</Button>
					<Button onClick={() => setQuality(2)}>1080p</Button>
					<Button onClick={() => setQuality(-1)}>Auto</Button>
				</div>
			</Panel>
		);
	},
});

export default MainPanel;
