import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export let scence, camera, renderer, controls;

(function init() {
    scence = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 0.1
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
})();

(function createControls() {
    controls = new OrbitControls(camera, renderer.domElement)
})();

(function createHelper() {
    const axesHelper = new THREE.AxesHelper(5)
    scence.add(axesHelper)
})();

// resize
(function resizeRender() {
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        // 更新相机的投影矩阵
        camera.updateProjectionMatrix()
    })
})();


(function renderLoop() {
    renderer.render(scence, camera)
    controls.update()
    requestAnimationFrame(renderLoop)
})();