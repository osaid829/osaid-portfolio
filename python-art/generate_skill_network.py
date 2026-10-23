"""A relationship map, not a proficiency score. Edges encode shared workflows."""
from common import save_svg,path
from html import escape
NODES=[('Full-stack',350,215),('Frontend',185,100),('Interactive UI',540,105),('3D web',535,320),('Python',185,330),('AI integration',350,380)]
EDGES=[(0,1),(0,2),(0,3),(0,4),(0,5),(1,2),(2,3),(4,5)]

def build(name,width,height,nodes):
    parts=[]
    for x in range(20,width,30):
        for y in range(30,height,30): parts.append(f'<circle cx="{x}" cy="{y}" r=".7" fill="#424d40"/>')
    for a,b in EDGES:
        _,x1,y1=nodes[a];_,x2,y2=nodes[b]
        parts.append(path([(x1,y1),(x2,y2)],opacity=.5,width=1))
    for i,(label,x,y) in enumerate(nodes):
        r=28 if i==0 else 8
        parts.append(f'<circle cx="{x}" cy="{y}" r="{r+7}" fill="#111614" stroke="#475443" stroke-width=".7"/>')
        parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#202b1f" stroke="#c4d4b8"/>')
        if i==0: parts.append(f'<path d="M{x-8} {y}h16M{x} {y-8}v16" stroke="#d8e6cc"/>')
        font=14 if width<500 else 16
        parts.append(f'<text x="{x}" y="{y+r+29}" text-anchor="middle" fill="#dce4d7" font-family="Arial,sans-serif" font-size="{font}">{escape(label)}</text>')
    save_svg(name,width,height,parts,'Relationships between six development areas; connections are conceptual, not proficiency ratings')

def generate():
    build('skill-network.svg',700,455,NODES)
if __name__=='__main__': generate()
