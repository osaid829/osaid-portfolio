"""Generate a deterministic vector field used by the midnight motion layer."""

from math import cos, pi, sin
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'generated'
OUT.mkdir(parents=True, exist_ok=True)


def generate() -> None:
    width, height = 1600, 900
    parts = [
        '<rect width="1600" height="900" fill="#070a12"/>',
        '<circle cx="1210" cy="280" r="330" fill="#756dff" fill-opacity=".08"/>',
        '<circle cx="420" cy="690" r="260" fill="#75d8ff" fill-opacity=".045"/>',
    ]
    for layer in range(18):
        points = []
        for step in range(96):
            t = step / 95 * pi * 2
            radius = 95 + layer * 18
            x = 840 + cos(t * 2.2 + layer * .18) * radius + sin(t * 5 + layer) * 34
            y = 440 + sin(t * 1.55 - layer * .12) * radius * .48 + cos(t * 3.2) * 22
            points.append(f'{x:.1f},{y:.1f}')
        opacity = .08 + layer * .012
        color = '#c3ed88' if layer % 4 == 0 else '#75d8ff'
        parts.append(f'<polyline points="{" ".join(points)}" fill="none" stroke="{color}" stroke-opacity="{opacity:.3f}" stroke-width="1"/>')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}"><title>Deterministic midnight vector field</title>{"".join(parts)}</svg>'
    (OUT / 'motion-field.svg').write_text(svg)


if __name__ == '__main__':
    generate()
