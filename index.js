import * as SPLAT from "gsplat";

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
const controls = new SPLAT.OrbitControls(camera, renderer.canvas);

async function main() {
    const renderArea = document.getElementById('render-area');
    renderArea.appendChild(renderer.canvas);

    renderer.canvas.style.width = '100%';
    renderer.canvas.style.height = 'auto';
    renderer.canvas.style.display = 'inline-block';
    renderer.canvas.style.borderRadius = '12px';
    renderer.canvas.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.1)';

    const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";

    await SPLAT.Loader.LoadAsync(url, scene, () => {});

    const frame = () => {
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
}

async function loadSplats() {
  try {
    const response = await fetch('http://localhost:3000/getfiles');
    var splatNames = await response.json();
    splatNames = splatNames.files;

    const splatsList = document.getElementById('splats-list');
    splatsList.innerHTML = ''; // Clear any existing content

    splatNames.forEach(name => {
      const listItem = document.createElement('li');
      listItem.textContent = name;
      listItem.addEventListener('click', () => loadSplat(name));
      splatsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading splats:', error);
  }
}

async function loadSplat(name) {
  try {
    const response = await fetch('http://localhost:3000/file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const video_img = URL.createObjectURL(blob);

    // Logic to load the splat into the scene
    SPLAT.PLYLoader.LoadAsync(video_img, scene, () => {
      console.log(`Loaded splat from ${name}`);
    });
  } catch (error) {
    console.error('Error loading splat:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    main();
    loadSplats();
});
