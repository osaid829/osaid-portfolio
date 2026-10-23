"""Deterministic, dependency-light SVG helpers. All artwork is original."""
from pathlib import Path
import numpy as np
OUT = Path(__file__).resolve().parent.parent / 'public' / 'generated'
OUT.mkdir(parents=True, exist_ok=True)
SEED = 2718

def save_svg(name, width, height, parts, title='Procedural system field'):
    body=''.join(parts)
    (OUT/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}"><title>{title}</title>{body}</svg>')

def path(points, stroke='#a6b29f', opacity=.5, width=.7):
    coords=' '.join(f'{x:.1f},{y:.1f}' for x,y in points)
    return f'<polyline points="{coords}" fill="none" stroke="{stroke}" stroke-opacity="{opacity}" stroke-width="{width}"/>'

def project(points, scale=100, cx=300, cy=230):
    # Orthographic rotation shared by the offline system studies.
    ax,ay=.6,-.35
    rx=np.array([[1,0,0],[0,np.cos(ax),-np.sin(ax)],[0,np.sin(ax),np.cos(ax)]])
    ry=np.array([[np.cos(ay),0,np.sin(ay)],[0,1,0],[-np.sin(ay),0,np.cos(ay)]])
    p=points@rx.T@ry.T
    return np.column_stack([cx+p[:,0]*scale,cy+p[:,1]*scale])
