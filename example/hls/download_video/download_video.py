import os
from tqdm import tqdm
import subprocess


def download_video(video_url, output_path, format_id=None):
    output_template = f"{output_path}.mp4"

    if format_id:
        format_option = f"{format_id}+bestaudio[ext=m4a]"
    else:
        format_option = "bestvideo[ext=mp4][vcodec=h264]+bestaudio[ext=m4a][acodec=aac]/best[ext=mp4]"

    print(f"Downloading video to {output_path}")

    command = [
        "yt-dlp",
        "--no-warnings",
        "--format", format_option,
        "--merge-output-format", "mp4",
        "--no-keep-video",
        "-o", output_template,
        video_url
    ]

    subprocess.run(command)
