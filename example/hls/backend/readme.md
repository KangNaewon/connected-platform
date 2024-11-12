# backend 실행 방법
1. **필수 패키지 설치**
    ```shell
    npm install express
    npm install fluent-ffmpeg @ffmpeg-installer/ffmpeg
    npm install hls-server
    ```
2. `videos/${videoname}` 디렉토리를 생성하여 비디오 파일을 넣는다.
3. `ffmpeg.js` 파일 내의 `videoname` 변수를 지정한다.
4. `node ffmpeg.js` 명령어를 통해 HLS 파일을 생성한다.
5. `node server.js` 명령어를 통해 서버를 실행한다.