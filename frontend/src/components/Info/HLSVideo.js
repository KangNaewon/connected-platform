import { useRef, useEffect, useCallback } from 'react';
import Hls from 'hls.js';
import ri from '@enact/ui/resolution';

const HLSVideo = (props) => {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);

	useEffect(() => {
		console.log(props.src)
		if (Hls.isSupported()) {
			const video = videoRef.current;
			const hls = new Hls();
			hls.loadSource(props.src);
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
		</div >
	);
};

const styles = {
	videoContainer: {
		position: 'relative',
		width: '100%',
		paddingTop: '56.25%', // 16:9 비율을 위한 9/16 * 100
		backgroundColor: 'White', // 비디오 로딩 전 배경색
		overflow: 'hidden',
	},
	video: {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
	},
}

export default HLSVideo;
