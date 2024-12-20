import { scene } from './utils/main.js'
import * as THREE from 'three'

// 1. 创建场景信息  数据影响视图
// 2. 定义数据对象相关的属性和值
// 3. 创建纹理贴图函数
// 4. 地上热点标记函数
// 5. dat.gui 工具函数调整位置
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
    // 渲染体颜色太浅，贴图图片翻转，要对立方体进行一个缩放
    cube.scale.set(1, 1, -1)
    scene.add(cube);
    return cube;
}

// 准备创建纹理贴图函数
// 创建贴图函数
function setMaterialCube(infoObj) {
    const { publicPath, imgUrlArr, markList } = infoObj
    // 加载2d 纹理
    const textureLoader = new THREE.TextureLoader()
    textureLoader.setPath(publicPath)

    // 遍历贴图
    const materialArr = imgUrlArr.map(imgStr => {
        const texture = textureLoader.load(imgStr);
        // 空间颜色加深
        texture.colorSpace = THREE.SRGBColorSpace
        return new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
    })

    myCube.material = materialArr // 覆盖

    // 贴地标
    markList.forEach(item => {
        if (item.name === 'landMark') setLardMarkFn(item);
    });

}

function setLardMarkFn(markData) {
    const { imgUrl, wh, position, rotation } = markData
    // 创建 geometry 与 material
    const geometry = new THREE.PlaneGeometry(...wh);
    // 材料是要贴图的
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(imgUrl)
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
    })
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
}

const myCube = createCube();
setMaterialCube(sceneInfoObj.one)