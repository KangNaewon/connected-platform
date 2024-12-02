import {useRef, useEffect, useCallback, useState} from 'react';
import Button from '@enact/sandstone/Button'
import Hls from 'hls.js';

const HLSVideo = ({src, onQualityChange}) => {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);
	// const [lastPlaybackPosition, setLastPlaybackPosition] = useState(0);

	useEffect(() => {
        if (Hls.isSupported()) {
            const video = videoRef.current;
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                console.log('Manifest loaded with levels:', hls.levels);
            });

            hlsRef.current = hls;
			
			const intervalId = setInterval(() => {
                if (hls.currentLevel !== -1) {
                    const currentLevel = hls.levels[hls.currentLevel];
                    console.log(
                        `Current Quality: ${currentLevel.height}p (${currentLevel.bitrate / 1000} kbps)`
                    );
                } else {
                    console.log('Current Quality: Auto');
                }
            }, 1000); // 1초 간격

            // Cleanup
            return () => hls.destroy();
        }
    }, [src]);


	const setQuality = (qualityIndex) => {
		if(hlsRef.current) {
			hlsRef.current.nextLevel = qualityIndex;
			console.log('Set quality to:', qualityIndex);
		}
	};

	useEffect(() => {
		if(onQualityChange) {
			onQualityChange(setQuality);
		}
	}, [onQualityChange]);

	// 재생 위치 저장
    // const handlePause = () => {
    //     const video = videoRef.current;
    //     if (video) {
    //         setLastPlaybackPosition(video.currentTime); // 현재 위치 저장
    //         console.log('Paused at:', video.currentTime);
    //     }
    // };

    // 재생 위치 복원
    // const handlePlay = () => {
    //     const video = videoRef.current;
    //     if (video && lastPlaybackPosition > 0) {
    //         video.currentTime = lastPlaybackPosition; // 저장된 위치로 이동
    //         console.log('Resuming at:', lastPlaybackPosition);
    //     }
    // };
	/* onPause={handlePause} onPlay={handlePlay} */

	return (
		<>
			<video ref={videoRef} controls height={720} />
			
		</>
	);
};

export default HLSVideo;
