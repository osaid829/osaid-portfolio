"""Generate the wireframe system used by the WebGL fallback."""
import numpy as np
from common import save_svg,path,project

def generate():
    t=np.linspace(0,2*np.pi,230)
    center=np.column_stack([(1.5+.4*np.cos(3*t))*np.cos(2*t),(1.5+.4*np.cos(3*t))*np.sin(2*t),.65*np.sin(3*t)])
    parts=[]
    for j in range(16):
        a=j/16*2*np.pi
        tube=center+np.column_stack([.25*np.cos(a)*np.cos(2*t),.25*np.cos(a)*np.sin(2*t),np.full_like(t,.25*np.sin(a))])
        parts.append(path(project(tube,87,300,225),opacity=.6,width=.8))
    save_svg('core-fallback.svg',600,450,parts,'Interconnected interface, logic and data loops')
    # Distinct expanded topology for static network mode.
    parts=[path(project(center,96,300,225),opacity=.5)]
    pts=project(center[::5],96,300,225)
    for i,p in enumerate(pts):
        parts.append(path([p,pts[(i+5)%len(pts)]],opacity=.35))
        parts.append(f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="2" fill="#ced8c7"/>')
    save_svg('core-network.svg',600,450,parts,'Expanded system connections')
if __name__=='__main__': generate()
