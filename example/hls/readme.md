## Usage
1. Install packages
```bash
npm install @ffmpeg-installer/ffmpeg fluent-ffmpeg cors express hls-server hls.js 
```

2. Run the server
```bash
cd backend
node server.js
```

3. Run the client
```bash
cd frontend
enact serve
```

4. Open the browser and go to `http://localhost:8080`

### How to add a new video?

1. If you want to add a new video, make a directory named as same as the video's name in the `backend/videos` directory and put the video file in it.

2. Then, go to the 'backend/ffmpeg.js'  file and change the `videoName` variable to the video's name.

3. Run `backend/ffmpeg.js` file to generate the HLS files.
    ```bash
    cd backend
    node ffmpeg.js
    ```

4. Finally, run the server again.
    ```bash
    node server.js
    ```
