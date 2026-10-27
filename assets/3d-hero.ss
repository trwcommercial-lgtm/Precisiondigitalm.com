
/* Precision Digital Marketing - 3D Hero */

#pdm-3d-hero {
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  background: transparent;
}

#pdm-3d-hero canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
}

@media (max-width: 768px) {
  #pdm-3d-hero {
    min-height: 280px;
  }
}
