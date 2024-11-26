import {useRef, useEffect, useCallback} from 'react';
import Button from '@enact/sandstone/Button'
import Hls from 'hls.js';

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
		<>
			<video ref={videoRef} controls height={720} />
		</>
	);
};

export default HLSVideo;
