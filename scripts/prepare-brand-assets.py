#!/usr/bin/env python3
"""Prepare deterministic Simply Admin PNG brand assets.

If Pillow is not installed, run:
    python -m pip install Pillow

The script deliberately uses a binary alpha mask and nearest-neighbor resizing so
that generated assets have crisp pixels and no semi-transparent edge halos.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "brand" / "simply-admin-logo-source.png"
BRAND_DIR = ROOT / "public" / "brand"

ALPHA_THRESHOLD = 128
NEAR_WHITE_THRESHOLD = 245
MASTER_PADDING = 12
MARK_CANVAS_SIZE = 238
FAVICON_SIZES = (32, 192, 512)
FAVICON_OCCUPANCY = 0.84
NEAREST = Image.Resampling.NEAREST


@dataclass(frozen=True)
class AssetReport:
    path: Path
    size: tuple[int, int]
    bytes: int
    alpha: bool
    binary_alpha: bool
    transparent_background: bool
    non_empty: bool
    not_cropped: bool


def build_binary_foreground(source: Image.Image) -> Image.Image:
    """Return a 1-bit-style L mask for dark, sufficiently opaque pixels."""
    rgba = source.convert("RGBA")
    pixels = rgba.load()
    mask = Image.new("L", rgba.size, 0)
    mask_pixels = mask.load()

    for y in range(rgba.height):
        for x in range(rgba.width):
            red, green, blue, alpha = pixels[x, y]
            is_near_white = (
                red >= NEAR_WHITE_THRESHOLD
                and green >= NEAR_WHITE_THRESHOLD
                and blue >= NEAR_WHITE_THRESHOLD
            )
            if alpha >= ALPHA_THRESHOLD and not is_near_white:
                mask_pixels[x, y] = 255

    if mask.getbbox() is None:
        raise ValueError(f"No foreground pixels found in {SOURCE}")
    return mask


def active_column_runs(mask: Image.Image) -> list[tuple[int, int]]:
    """Return inclusive runs of columns containing foreground pixels."""
    bbox = mask.getbbox()
    if bbox is None:
        return []

    left, top, right, bottom = bbox
    active = [
        x
        for x in range(left, right)
        if mask.crop((x, top, x + 1, bottom)).getbbox() is not None
    ]
    runs: list[tuple[int, int]] = []
    for x in active:
        if not runs or x > runs[-1][1] + 1:
            runs.append((x, x))
        else:
            runs[-1] = (runs[-1][0], x)
    return runs


def find_mark_bbox(mask: Image.Image) -> tuple[int, int, int, int]:
    """Locate the left-hand SA mark using its substantial gap from the wordmark."""
    content_bbox = mask.getbbox()
    if content_bbox is None:
        raise ValueError("Cannot locate the SA mark in an empty mask")

    left, top, _right, bottom = content_bbox
    runs = active_column_runs(mask)
    minimum_separator = max(4, (bottom - top) // 20)

    for current, following in zip(runs, runs[1:]):
        gap = following[0] - current[1] - 1
        if gap >= minimum_separator:
            mark_bbox = (left, top, current[1] + 1, bottom)
            mark_width = mark_bbox[2] - mark_bbox[0]
            mark_height = mark_bbox[3] - mark_bbox[1]
            if 0.75 <= mark_width / mark_height <= 1.25:
                return mark_bbox

    raise ValueError("Could not identify the gap between the SA mark and wordmark")


def crop_with_padding(mask: Image.Image, bbox: tuple[int, int, int, int]) -> Image.Image:
    content = mask.crop(bbox)
    padded = Image.new(
        "L",
        (content.width + 2 * MASTER_PADDING, content.height + 2 * MASTER_PADDING),
        0,
    )
    padded.paste(content, (MASTER_PADDING, MASTER_PADDING))
    return padded


def crop_mark_on_square(mask: Image.Image, bbox: tuple[int, int, int, int]) -> Image.Image:
    content = mask.crop(bbox)
    if content.width > MARK_CANVAS_SIZE or content.height > MARK_CANVAS_SIZE:
        raise ValueError("The SA mark does not fit the configured square canvas")

    square = Image.new("L", (MARK_CANVAS_SIZE, MARK_CANVAS_SIZE), 0)
    offset = (
        (MARK_CANVAS_SIZE - content.width) // 2,
        (MARK_CANVAS_SIZE - content.height) // 2,
    )
    square.paste(content, offset)
    return square

def colorize(mask: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    output = Image.new("RGBA", mask.size, (0, 0, 0, 0))
    solid = Image.new("RGBA", mask.size, (*color, 255))
    output.paste(solid, (0, 0), mask)
    return output


def make_favicon(mark_mask: Image.Image, size: int) -> Image.Image:
    available = max(1, round(size * FAVICON_OCCUPANCY))
    scale = min(available / mark_mask.width, available / mark_mask.height)
    resized_size = (
        max(1, round(mark_mask.width * scale)),
        max(1, round(mark_mask.height * scale)),
    )
    resized = mark_mask.resize(resized_size, NEAREST)

    canvas_mask = Image.new("L", (size, size), 0)
    offset = ((size - resized.width) // 2, (size - resized.height) // 2)
    canvas_mask.paste(resized, offset)
    return colorize(canvas_mask, (0, 0, 0))


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def inspect_asset(path: Path) -> AssetReport:
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        alpha = rgba.getchannel("A")
        alpha_values = {value for count, value in zip(alpha.histogram(), range(256)) if count}
        bbox = alpha.getbbox()
        non_empty = bbox is not None
        not_cropped = bool(
            bbox
            and bbox[0] > 0
            and bbox[1] > 0
            and bbox[2] < rgba.width
            and bbox[3] < rgba.height
        )

        return AssetReport(
            path=path,
            size=rgba.size,
            bytes=path.stat().st_size,
            alpha="A" in image.getbands(),
            binary_alpha=alpha_values.issubset({0, 255}),
            transparent_background=0 in alpha_values,
            non_empty=non_empty,
            not_cropped=not_cropped,
        )


def validate_geometry(paths: dict[str, Path]) -> None:
    with Image.open(paths["logo_mono"]) as mono, Image.open(paths["logo_inverted"]) as inverted:
        if mono.getchannel("A").tobytes() != inverted.getchannel("A").tobytes():
            raise ValueError("Mono and inverted logo geometry differ")

    with Image.open(paths["mark_mono"]) as mono, Image.open(paths["mark_inverted"]) as inverted:
        if mono.size != (MARK_CANVAS_SIZE, MARK_CANVAS_SIZE):
            raise ValueError("Mono SA mark is not on the configured square canvas")
        if inverted.size != (MARK_CANVAS_SIZE, MARK_CANVAS_SIZE):
            raise ValueError("Inverted SA mark is not on the configured square canvas")
        if mono.getchannel("A").tobytes() != inverted.getchannel("A").tobytes():
            raise ValueError("Mono and inverted mark geometry differ")

    for key in ("favicon_32", "favicon_192", "favicon_512"):
        with Image.open(paths[key]) as favicon:
            bbox = favicon.getchannel("A").getbbox()
            if bbox is None:
                raise ValueError(f"{paths[key].name} is empty")
            left, top, right, bottom = bbox
            if abs(left - (favicon.width - right)) > 1:
                raise ValueError(f"{paths[key].name} is not horizontally centered")
            if abs(top - (favicon.height - bottom)) > 1:
                raise ValueError(f"{paths[key].name} is not vertically centered")


def main() -> None:
    with Image.open(SOURCE) as source:
        foreground = build_binary_foreground(source)

    logo_bbox = foreground.getbbox()
    if logo_bbox is None:
        raise ValueError("The source logo is empty")
    mark_bbox = find_mark_bbox(foreground)

    logo_mask = crop_with_padding(foreground, logo_bbox)
    mark_content_mask = foreground.crop(mark_bbox)
    mark_mask = crop_mark_on_square(foreground, mark_bbox)

    paths = {
        "logo_mono": BRAND_DIR / "simply-admin-logo-mono.png",
        "logo_inverted": BRAND_DIR / "simply-admin-logo-inverted.png",
        "mark_mono": BRAND_DIR / "simply-admin-mark-mono.png",
        "mark_inverted": BRAND_DIR / "simply-admin-mark-inverted.png",
        "favicon_32": ROOT / "public" / "favicon-32x32.png",
        "favicon_192": ROOT / "public" / "favicon-192x192.png",
        "favicon_512": ROOT / "public" / "favicon-512x512.png",
    }

    save_png(colorize(logo_mask, (0, 0, 0)), paths["logo_mono"])
    save_png(colorize(logo_mask, (255, 255, 255)), paths["logo_inverted"])
    save_png(colorize(mark_mask, (0, 0, 0)), paths["mark_mono"])
    save_png(colorize(mark_mask, (255, 255, 255)), paths["mark_inverted"])

    for size in FAVICON_SIZES:
        save_png(make_favicon(mark_content_mask, size), paths[f"favicon_{size}"])

    validate_geometry(paths)
    reports = [inspect_asset(path) for path in paths.values()]
    failed = [
        report
        for report in reports
        if not all(
            (
                report.alpha,
                report.binary_alpha,
                report.transparent_background,
                report.non_empty,
                report.not_cropped,
            )
        )
    ]
    if failed:
        names = ", ".join(report.path.name for report in failed)
        raise ValueError(f"Asset validation failed: {names}")

    print(f"Source content: {logo_bbox[2] - logo_bbox[0]}x{logo_bbox[3] - logo_bbox[1]} px")
    print(f"SA mark content: {mark_bbox[2] - mark_bbox[0]}x{mark_bbox[3] - mark_bbox[1]} px")
    print("Generated assets:")
    for report in reports:
        relative = report.path.relative_to(ROOT).as_posix()
        print(
            f"- {relative}: {report.size[0]}x{report.size[1]} px, "
            f"{report.bytes} bytes, RGBA, binary alpha, transparent, non-empty, not cropped"
        )


if __name__ == "__main__":
    main()
