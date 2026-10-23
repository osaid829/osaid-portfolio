"""Generate the seeded project texture used by the midnight surfaces."""
import numpy as np
from PIL import Image
from common import OUT,SEED

def generate():
    rng=np.random.default_rng(SEED)
    yy,xx=np.mgrid[0:256,0:512]
    field=np.sin(xx/17+np.sin(yy/34))*np.cos(yy/29)+rng.normal(0,.12,(256,512))
    values=np.clip(25+field*9,0,255).astype('uint8')
    Image.fromarray(values,'L').save(OUT/'project-texture.png',optimize=True)
if __name__=='__main__': generate()
