#!/usr/bin/env python3
"""Make a 600px-wide copy (<name>-600.webp) of each project screenshot.

Project images display at most 480px wide, so phones and 1x screens load the
small copy via srcset. Re-run after adding a project image (needs Pillow):

    npm run thumbs
"""
from pathlib import Path

from PIL import Image

PROJECTS = Path(__file__).resolve().parent.parent / "public/assets/images/projects"
WIDTH = 600

for source in sorted(PROJECTS.glob("*.webp")):
    if source.stem.endswith(f"-{WIDTH}"):
        continue

    with Image.open(source) as image:
        height = round(image.height * WIDTH / image.width)
        thumb = image.resize((WIDTH, height), Image.LANCZOS)
        thumb.save(source.with_name(f"{source.stem}-{WIDTH}.webp"), quality=80, method=6)

print(f"thumbnails written to {PROJECTS}")
