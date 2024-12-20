import { camera, scene } from '/utils/main.js'
import * as THREE from 'three'
// 创建底层立方体
export function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
    const cube = new THREE.Mesh(geometry, material);
    // 渲染体颜色太浅，贴图图片翻转，要对立方体进行一个缩放
    cube.scale.set(1, 1, -1)
    scene.add(cube);
    return cube;
}

