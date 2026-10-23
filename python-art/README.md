# Osaid procedural art

Python is an **offline authoring tool**. The Next.js application never starts Python, calls a Python service, or requires Python on Vercel. Generated assets are committed in `public/generated/`.

## Rebuild

From the project root, with Python 3 and the three requested libraries installed:

```bash
python3 python-art/generate_all.py
```

To set up those required libraries on another machine:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r python-art/requirements.txt
npm run art
```

All output paths are resolved from the scripts, not the calling directory. Seed: **2718**. Matplotlib uses a fixed SVG hash salt and excludes timestamps. There are no downloaded image/model dependencies.

## Visible integration map

| Generator | Output | Site placement |
|---|---|---|
| `generate_hero_field.py` | `core-fallback.svg`, `core-network.svg` | Static alternatives to WebGL |
| `generate_skill_network.py` | `skill-network.svg` | Capabilities relationship map |
| `generate_section_dividers.py` | `divider-02.svg` | Contact atmosphere |
| `generate_project_texture.py` | `project-texture.png` | Texture on every project study |
| `generate_motion_field.py` | `motion-field.svg` | Midnight vector field behind the redesigned hero and capability bento |

The six skill nodes represent development areas. Edges express conceptual connections: full-stack connects all areas; frontend connects interactive UI; UI connects 3D; Python connects AI. They do **not** imply proficiency scores, years of experience, or measured work activity.

Artwork is original and the generated system studies are used as atmosphere or WebGL fallbacks, not as product screenshots. Most SVGs act as CSS backgrounds tinted with the central accent. The relationship diagram uses a neutral grayscale palette so it stays compatible with any accent. PNG output is 512×256, grayscale, optimized.

This pipeline supplies the WebGL fallbacks, skills map, midnight field, project texture, and contact atmosphere without requiring Python at runtime.
