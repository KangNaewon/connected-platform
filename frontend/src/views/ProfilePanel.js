import React, { useEffect, useState } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import { useUserInfo } from '../context/UserContext';
import { request } from '../request/request';
import BackButton from '../components/Buttons/BackButton';
import NetflixStyleGrid from '../components/Profile/NetflixStyleGrid';

const ProfilePanel = () => {
	const [likes, setlikes] = useState([]);
	const [visited, setVisited] = useState([]);

	// Get profile_id from UserContext
	const { userInfo } = useUserInfo();
	const { profile_id } = userInfo;

	// load liked, visited restaurant list
	useEffect(() => {
		const fetchProfile = async () => {
			await request(`/profile/${profile_id}`, 'GET')
				.catch((err) => console.error(err))
				.then((res) => {
					setlikes(res.likes);
					setVisited(res.visited);
				});
		};

		fetchProfile();
	}, []);


	return (
		<Panel>
			<Header title="프로필" type="compact" style={styles.headerStyle} slotAfter={<><BackButton/></>}/>
			<div style={styles.container}>
				<div style={styles.leftDiv}>
					<NetflixStyleGrid items={likes} />
				</div>
				<div style={styles.rightDiv}>
					<NetflixStyleGrid items={visited} />
				</div>
			</div>
		</Panel>
	);
};

const styles = {
	container: {
		display: 'flex',
		width: '100%', // 고정된 너비
		height: '100vh',
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
		padding: '100px',
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
		padding: '100px',
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