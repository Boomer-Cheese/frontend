import * as SPLAT from "gsplat";

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
const controls = new SPLAT.OrbitControls(camera, renderer.canvas);

async function main() {
    renderer.canvas.style.width = '70%';
    renderer.canvas.style.height = '70%';
    renderer.canvas.style.display = 'block';
    renderer.canvas.style.marginLeft = '15%';
    renderer.canvas.style.marginTop = '2%';
    renderer.canvas.style.marginBottom = '5%';

    const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";

    await SPLAT.Loader.LoadAsync(url, scene, () => {});



    renderer.canvas.style.borderRadius = '12px';
    renderer.canvas.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.1)';


    const frame = () => {
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
}

main();