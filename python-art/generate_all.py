from generate_hero_field import generate as hero
from generate_skill_network import generate as skills
from generate_section_dividers import generate as sections
from generate_project_texture import generate as projects
from generate_motion_field import generate as motion
from common import OUT
if __name__=='__main__':
    for generator in (hero,skills,sections,projects,motion): generator()
    for file in sorted(OUT.iterdir()):print(f'{file.name}: {file.stat().st_size:,} bytes')
