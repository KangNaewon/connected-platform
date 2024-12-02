const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');

const videoName = 'test'

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const resolutions = [
    { name: '360p', scale: '640:360', bitrate: '800k' },
    { name: '720p', scale: '1280:720', bitrate: '1400k' },
    { name: '1080p', scale: '1920:1080', bitrate: '2800k' },
];

resolutions.forEach(({ name, scale, bitrate }) => {
    ffmpeg(`./videos/${videoName}/${videoName}.mp4`, { timeout: 432000 })
        .addOptions([
            `-vf scale=${scale}`,
            `-b:v ${bitrate}`,
            '-profile:v baseline', 
            '-level 3.0',
            '-start_number 0',
            '-hls_time 10',
            '-hls_list_size 0',
            '-f hls'
        ])
        .output(`./videos/${videoName}/${name}/index.m3u8`)
        .on('end', () => {
        console.log('end');
        })
        .run();
});

const masterPlayList = 
`#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=1280x720
720p/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1920x1080
1080p/index.m3u8`;

fs.writeFileSync(`./videos/${videoName}/master.m3u8`, masterPlayList);
console.log('Master playlist created.');
