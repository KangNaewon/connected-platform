import { Panel, Header } from '@enact/sandstone/Panels';
import VideoList from '../components/Info/VideoList';
import HLSVideo from '../components/Info/HLSVideo';
import Content from '../components/Info/Content';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';

import { request } from '../request/request';
import { useEffect, useState } from 'react';

const ProfilePanel = () => {
	return (
		<Panel>
			<Header title="프로필" type="compact" style={styles.headerStyle} />
			< div style={styles.container}>
				<div style={styles.leftDiv}>
					<Scroller>
					</Scroller>
				</div>
				<div style={styles.rightDiv}>
					<Scroller>
					</Scroller>
				</div>
			</div>
		</Panel>
	);
};

const styles = {
	container: {
		display: 'flex',
		width: '1920px', // 고정된 너비
		height: '80vh',
		padding: '20px',
		backgroundColor: '#f7f7f7',
		justifyContent: 'space-between', // 좌우 공간 균등 분배
		borderRadius: ri.scale(10),
	},
	leftDiv: {
		height: '100%',
		width: '49%', // 너비를 약간 줄여 중앙 공간 확보
		backgroundColor: '#fff',
		border: '2px solid rgba(0, 0, 0, 0.3)',
		borderRadius: ri.scale(10),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightDiv: {
		height: '100%',
		width: '49%', // 너비를 약간 줄여 중앙 공간 확보
		backgroundColor: '#fff',
		border: '2px solid rgba(0, 0, 0, 0.3)',
		borderRadius: ri.scale(10),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentsContainer: {
		margin: 'auto',
		marginTop: '20px',
		marginBottom: '50px',
		width: '95%',
	},
	headerStyle: {
		marginBottom: -ri.scale(50)
	}
}



export default ProfilePanel