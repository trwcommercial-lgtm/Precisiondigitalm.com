
/* PRECISION DIGITAL MARKETING
   Interactive Three.js Hero - Version 1.0 */

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("pdm-3d-hero");
  if (!container) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Avoid heavy WebGL rendering on reduced-motion devices.
  if (reduceMotion.matches) return;

  let THREE;

  try {
    THREE = await import(
      "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
    );
  } catch (error) {
    console.warn("3D engine could not load:", error);
    return;
  }

  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
  } catch (error) {
    console.warn("WebGL is unavailable:", error);
    return;
  }

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 1.75)
  );

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    38,
    1,
    0.1,
    100
  );

  camera.position.set(0, 0, 9);

  // Main sculpture group
  const sculpture = new THREE.Group();
  scene.add(sculpture);

  // Dark metallic core
  const coreGeometry = new THREE.TorusKnotGeometry(
    1.45,
    0.43,
    180,
    20,
    2,
    3
  );

  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x7d899d,
    metalness: 0.92,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.16
  });

  const core = new THREE.Mesh(
    coreGeometry,
    coreMaterial
  );

  sculpture.add(core);

  // Geometric outer wireframe
  const frameGeometry = new THREE.IcosahedronGeometry(
    2.45,
    1
  );

  const frameMaterial = new THREE.MeshBasicMaterial({
    color: 0xe74c3c,
    wireframe: true,
    transparent: true,
    opacity: 0.17,
    depthWrite: false
  });

  const frame = new THREE.Mesh(
    frameGeometry,
    frameMaterial
  );

  sculpture.add(frame);

  // Inner glowing red structure
  const innerGeometry = new THREE.IcosahedronGeometry(
    1.15,
    1
  );

  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0xc0392b,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    depthWrite: false
  });

  const inner = new THREE.Mesh(
    innerGeometry,
    innerMaterial
  );

  sculpture.add(inner);

  // Cinematic lighting
  scene.add(
    new THREE.AmbientLight(0xffffff, 1.4)
  );

  const mainLight = new THREE.DirectionalLight(
    0xffffff,
    3.5
  );
  mainLight.position.set(3, 5, 6);
  scene.add(mainLight);

  const redLight = new THREE.PointLight(
    0xff392b,
    75,
    14
  );
  redLight.position.set(-3, 2, 3);
  scene.add(redLight);

  const blueLight = new THREE.PointLight(
    0x2864bb,
    45,
    14
  );
  blueLight.position.set(3, -3, 2);
  scene.add(blueLight);

  // Subtle floating particles
  const particleCount = 110;
  const positions = new Float32Array(
    particleCount * 3
  );

  for (let i = 0; i < particleCount; i++) {
    const index = i * 3;

    positions[index] = (Math.random() - 0.5) * 11;
    positions[index + 1] = (Math.random() - 0.5) * 8;
    positions[index + 2] = (Math.random() - 0.5) * 6;
  }

  const particleGeometry = new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xe74c3c,
    size: 0.025,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  // Mouse interaction
  const mouse = { x: 0, y: 0 };
  const smoothMouse = { x: 0, y: 0 };

  function handleMouseMove(event) {
    if (window.innerWidth <= 768) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
  }

  window.addEventListener(
    "pointermove",
    handleMouseMove,
    { passive: true }
  );

  // Resize handling
  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);

    const mobile = window.innerWidth <= 768;
    sculpture.scale.setScalar(mobile ? 0.72 : 1);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  // Animation
  const clock = new THREE.Clock();
  let animationFrame = null;
  let active = true;

  function animate() {
    if (!active) return;

    animationFrame = requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    smoothMouse.x += (
      mouse.x - smoothMouse.x
    ) * 0.035;

    smoothMouse.y += (
      mouse.y - smoothMouse.y
    ) * 0.035;

    core.rotation.x += delta * 0.09;
    core.rotation.y += delta * 0.16;

    frame.rotation.x -= delta * 0.045;
    frame.rotation.y += delta * 0.07;

    inner.rotation.y -= delta * 0.12;

    sculpture.rotation.y += (
      smoothMouse.x * 0.28 - sculpture.rotation.y
    ) * 0.025;

    sculpture.rotation.x += (
      -smoothMouse.y * 0.18 - sculpture.rotation.x
    ) * 0.025;

    sculpture.position.y =
      Math.sin(elapsed * 0.65) * 0.12;

    particles.rotation.y += delta * 0.004;

    renderer.render(scene, camera);
  }

  function setActive(shouldRun) {
    if (active === shouldRun) return;

    active = shouldRun;

    if (active) {
      clock.getDelta();
      animate();
    } else if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  const visibilityObserver = new IntersectionObserver(
    entries => {
      setActive(
        entries[0].isIntersecting &&
        !document.hidden
      );
    },
    { threshold: 0 }
  );

  visibilityObserver.observe(container);

  document.addEventListener("visibilitychange", () => {
    setActive(
      !document.hidden &&
      container.getBoundingClientRect().bottom > 0 &&
      container.getBoundingClientRect().top < window.innerHeight
    );
  });

  animate();

  console.log("Precision Digital Marketing 3D hero loaded.");
});
