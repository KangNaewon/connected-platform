import React, { useEffect, useState } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import ri from '@enact/ui/resolution';
import { useUserInfo } from '../context/UserContext';
import { request } from '../request/request';
import BackButton from '../components/Buttons/BackButton';
import NetflixStyleGrid from '../components/Profile/NetflixStyleGrid';
import { useAuth } from '../context/AuthContext';

const ProfilePanel = () => {
	const [likes, setlikes] = useState([]);
	const [visited, setVisited] = useState([]);

	// Get profile_id from UserContext
	const { userInfo } = useUserInfo();
	const { profile_id } = userInfo;

	const { authTokens } = useAuth();

	// load liked, visited restaurant list
	useEffect(() => {
		const fetchProfile = async () => {
			await request(`/profile/${profile_id}`, 'GET', {}, {}, authTokens.access_token)
				.catch((err) => console.error(err))
				.then((res) => {
					setlikes(res.likes);
					setVisited(res.visited);
				});
		};

		fetchProfile();
	}, [profile_id, authTokens]);

	return (
		<Panel>
			<Header title="프로필" type="compact" style={styles.headerStyle} slotAfter={<><BackButton /></>} />
			<div style={styles.container}>
				<div style={styles.leftDiv}>
					<div style={styles.sectionContainer}>
						<h1 style={styles.sectionTitle}>좋아요</h1>
						<NetflixStyleGrid items={likes} />
					</div>
				</div>
				<div style={styles.rightDiv}>
					<div style={styles.sectionContainer}>
						<h1 style={styles.sectionTitle}>방문한 식당</h1>
						<NetflixStyleGrid items={visited} />
					</div>
				</div>
			</div>
		</Panel>
	);
};

const styles = {
	container: {
		display: 'flex',
		width: ri.scale(1800),
		height: '100vh',
		padding: '20px',
		backgroundColor: '#f7f7f7',
		justifyContent: 'space-between',
		borderRadius: ri.scale(10),
	},
	leftDiv: {
		height: '100%',
		width: ri.scale(800),
		backgroundColor: '#fff',
		border: '2px solid rgba(0, 0, 0, 0.3)',
		borderRadius: ri.scale(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: ri.scale(20),
		paddingTop: 0,
	},
	rightDiv: {
		height: '100%',
		width: ri.scale(800),
		backgroundColor: '#fff',
		border: '2px solid rgba(0, 0, 0, 0.3)',
		borderRadius: ri.scale(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: ri.scale(20),
		paddingTop: 0,
	},
	sectionContainer: {
		width: '100%',
		height: '100%',
	},
	sectionTitle: {
		marginTop: ri.scale(30),
		marginBottom: ri.scale(40),
		fontSize: ri.scale(50),
		fontWeight: 'bold',
		color: 'black',
	},
	headerStyle: {
		marginBottom: -ri.scale(50)
	}
};

export default ProfilePanel;
