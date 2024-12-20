import { scene } from './utils/main.js'
import * as THREE from 'three'

// 创建场景信息
// 数据影响视图
// 定义属性和值
// 准备贴图
const sceneInfoObj = {
    // 第一个场景
    one: {
        publicPath: 'technology/1/',
        imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
        // 图片标记点
        markList: [
            {
                name: 'landMark',
                imgUrl: 'other/landmark.png',
                wh: [0.05, 0.05], // 平面宽高
                position: [0, 0, 0],
                rotation: [0, 0, 0], //旋转角度
                targetAttr: 'two'
            }
        ]
    }
}


// 创建底层立方体
function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}

// 准备创建纹理贴图函数
// 创建贴图函数
function setMaterialCube(infoObj) {
    const { publicPath, imgUrlArr, markList } = infoObj
    console.log('publicPath', imgUrlArr);
    // 加载2d 纹理
    const textureLoader = new THREE.TextureLoader()
    textureLoader.setPath(publicPath)

    // 遍历贴图
    const materialArr = imgUrlArr.map( imgStr => {
        const texture = textureLoader.load(imgStr);
        texture.colorSpace = THREE.SRGBColorSpace
        return new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
    })

    myCube.material = materialArr // 覆盖

}

const myCube = createCube();
setMaterialCube(sceneInfoObj.one).then(() => {
    console.log('贴图成功',);
});