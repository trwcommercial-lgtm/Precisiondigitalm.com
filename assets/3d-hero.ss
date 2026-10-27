
/* PRECISION DIGITAL MARKETING
   Interactive 3D Hero - Version 1.0 */

.hero {
  isolation: isolate;
}

#pdm-3d-hero {
  position: absolute;
  top: 64px;
  right: 0;
  bottom: 0;
  width: 62%;
  min-height: 400px;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 65% 42%,
    rgba(192, 57, 43, 0.10),
    transparent 60%
  );
}

#pdm-3d-hero canvas {
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero > .con {
  position: relative;
  z-index: 2;
}

.hero h1,
.hero-sub,
.hero-acts,
.hero-stats {
  position: relative;
  z-index: 2;
}

.hero h1 {
  text-shadow: 0 4px 35px rgba(6, 14, 26, 0.6);
}

#pdm-3d-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    #060e1a 0%,
    rgba(6, 14, 26, 0.75) 18%,
    transparent 65%
  );
  pointer-events: none;
}

@media (max-width: 1100px) {
  #pdm-3d-hero {
    width: 75%;
    opacity: 0.65;
  }
}

@media (max-width: 768px) {
  #pdm-3d-hero {
    top: 64px;
    width: 100%;
    height: 420px;
    bottom: auto;
    min-height: 0;
    opacity: 0.35;
  }

  #pdm-3d-hero::after {
    background: linear-gradient(
      180deg,
      rgba(6, 14, 26, 0.2),
      #060e1a 100%
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  #pdm-3d-hero {
    opacity: 0.15;
  }
}
