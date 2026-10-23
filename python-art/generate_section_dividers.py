"""Generate the contact atmosphere; deterministic and dependency-light."""
import numpy as np
from common import save_svg,path

def generate():
    xs=np.linspace(0,1200,180)
    parts=[]
    for i in range(30):
        ys=70+np.sin(xs/160+1.6)*np.sin(xs/430)*i*2+i*1.5
        parts.append(path(np.column_stack([xs,ys]),opacity=.65,width=.65))
    save_svg('divider-02.svg',1200,220,parts,'Parametric contact atmosphere')
if __name__=='__main__': generate()
