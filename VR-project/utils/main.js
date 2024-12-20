import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export let scene, camera, renderer, controls;

(function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 0.1
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
})();

(function createControls() {
    // 初始化轨道控制（Orbit Controls），允许用户通过鼠标或触摸手势来旋转、缩放和平移相机视角
    controls = new OrbitControls(camera, renderer.domElement)
})();

(function createHelper() {
    // 轴辅助对象（Axes Helper）
    const axesHelper = new THREE.AxesHelper(5)
    // 将这个辅助对象添加到场景中
    scene.add(axesHelper)
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

// 定义一个渲染循环，持续不断地渲染场景，并更新相机控制状态。
(function renderLoop() {
    // 渲染当前场景和相机视角
    renderer.render(scene, camera)
    // 更新轨道控制器的状态，处理用户的输入
    controls.update()
    // 浏览器在下一次重绘时调用 renderLoop 函数
    requestAnimationFrame(renderLoop)
})();