import subprocess

def get_format_code(video_url):
    command = [
        "yt-dlp",
        "--no-warnings",
        "--list-formats",
        video_url
    ]

    result = subprocess.run(command, capture_output=True, text=True)
    formats = result.stdout.splitlines()

    resolution_map = {}
    for line in formats:
        if 'x' in line and 'audio' not in line:
            parts = line.split()
            try:
                format_code = parts[0]
                resolution = parts[2]
                resolution_map[resolution] = format_code
            except IndexError:
                continue

    return resolution_map