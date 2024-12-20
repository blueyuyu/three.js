import { scene } from './utils/main.js';
import * as THREE from 'three';

// 创建场景信息
const sceneInfoObj = {
    one: {
        publicPath: 'technology/1/',
        imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
        markList: [
            {
                name: 'landMark',
                imgUrl: 'other/landmark.png',
                wh: [0.05, 0.05],
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                targetAttr: 'two'
            }
        ]
    }
};

// 创建底层立方体
function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        envMap: null,
        side: THREE.DoubleSide,
        metalness: 0.5,
        roughness: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}

// 准备创建纹理贴图函数
async function setMaterialCube(infoObj) {
    const { publicPath, imgUrlArr } = infoObj;

    // 使用 CubeTextureLoader 加载立方体贴图
    const loader = new THREE.CubeTextureLoader();
    loader.setPath(publicPath);

    const textureCube = await loader.loadAsync(imgUrlArr);

    // 设置颜色空间
    textureCube.colorSpace = THREE.SRGBColorSpace;

    // 应用立方体贴图到材质的 envMap 属性
    myCube.material.envMap = textureCube;
    myCube.material.needsUpdate = true; // 更新材质以应用更改

    // 确保有光源照亮场景
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
}

const myCube = createCube();

setMaterialCube(sceneInfoObj.one).then(() => {
    console.log('立方体贴图已成功加载');
});