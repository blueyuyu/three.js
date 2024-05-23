import { scence } from './utils/main.js'
import * as THREE from 'three'

// 创建场景信息
// 定义属性和值
// 准备贴图


// 创建底层立方体
function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry,material);
    scence.add(cube);
    return cube;
}

const cubeObj = createCube();