import { useRef, useEffect, useCallback } from 'react';
import Hls from 'hls.js';
import ri from '@enact/ui/resolution';
import { baseURL } from '../../request/request';

const HLSVideo = (props) => {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);

	useEffect(() => {
		console.log(props.src)
		if (Hls.isSupported()) {
			const video = videoRef.current;
			const hls = new Hls();
			hls.loadSource(`${baseURL}/media/${props.src}/master.m3u8`);
			hls.attachMedia(video);

			hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
				console.log(
					'>>>>>>>>>>>> manifest loaded, found ' +
					data.levels.length +
					' quality level'
				);
				video.play();
			});
			hlsRef.current = hls;
		}
	}, [props.src]);

	return (
		<div style={styles.videoContainer}>
			<video ref={videoRef} controls style={styles.video} />
		</div>
	);
};

const styles = {
	videoContainer: {
		position: 'relative',
		width: '100%',
		paddingTop: '56.25%', // 16:9 비율 유지
		overflow: 'hidden',
		borderRadius: ri.scale(20),
		backgroundColor: '#000',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
	},
	video: {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		borderRadius: ri.scale(20),
	},
};


export default HLSVideo;
