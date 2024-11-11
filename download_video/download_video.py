import os
from tqdm import tqdm
import subprocess


def download_video(video_url, output_path):
    output_template = f"{output_path}.%(ext)s"

    command = [
        "yt-dlp",
        "--no-warnings",
        "--format", "bestvideo[ext=mp4][vcodec=h264]+bestaudio[ext=m4a][acodec=aac]/best[ext=mp4]",
        "--merge-output-format", "mp4",
        "--no-keep-video",
        "-o", output_template,
        video_url
    ]

    subprocess.run(command)
