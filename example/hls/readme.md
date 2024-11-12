## Usage
1. Install the package
```bash
npm install @ffmpeg-installer/ffmpeg fluent-ffmpeg cors express hls-server hls.js 
```

2. Run the server
```bash
cd backend
node server.js
```
- &How to add a new video?*

    a. If you want to add a new video, make a directory named as same as the video's name in the `backend/videos` directory and put the video file in it.

    b. Then, go to the 'backend/ffmpeg.js'  file and change the `videoName` variable to the video's name.

    c. Run `backend/ffmpeg.js` file to generate the HLS files.
    ```bash
    cd backend
    node ffmpeg.js
    ```

    d. Finally, run the server again.
    ```bash
    node server.js
    ```

3. Run the client
```bash
cd frontend
enact serve
```

4. Open the browser and go to `http://localhost:8080`