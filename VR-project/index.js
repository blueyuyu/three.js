import { camera, scene } from './utils/main.js'
import * as THREE from 'three'
import guiMove from './utils/gui'

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
                position: [-0.21, -0.16, -0.12],
                rotation: [1.61, 0, 0], //旋转角度
                targetAttr: 'two'
            }
        ]
    },
    two: {
        publicPath: 'technology/2/',
        imgUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
        // 图片标记点
        markList: [
            {
                name: 'landMark',
                imgUrl: 'other/landmark.png',
                wh: [0.05, 0.05], // 平面宽高
                position: [0, 0, 0],
                rotation: [0, 0, 0], //旋转角度
                targetAttr: 'one'
            },
            {
                name: 'landMark',
                imgUrl: 'other/landmark.png',
                wh: [0.05, 0.05], // 平面宽高
                position: [0, -0.16, -0.12],
                rotation: [1.61, 0, 0], //旋转角度
                targetAttr: 'one'
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
    const { imgUrl, wh, position, rotation, targetAttr } = markData
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
    // plane 是地标
    plane.name = 'mark'
    plane.position.set(...position)
    plane.rotation.set(...rotation)

    // 设置自定义属性，方便点击遍历的时候，知道切换到哪一个场景
    plane.userData.attr = targetAttr

    scene.add(plane);
    // guiMove 
    // guiMove(plane);
}

// 点击函数
function bindClick() {
    //  raycaster 光线投射用于进行鼠标拾取
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    window.addEventListener('click', (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

        // 通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera(pointer, camera);
        // 计算物体和射线的焦点,返回一个包含所有相交结果的数组 (intersects
        const intersects = raycaster.intersectObjects(scene.children);
        //         该方法返回一个包含所有相交结果的数组 (intersects)。每个元素都是一个对象，包含了关于交点的详细信息，如：
        // point：交点的世界坐标。
        // object：被击中的3D对象。
        // distance：从射线起点到交点的距离。
        // face（如果适用）：被击中的多边形面。
        // uv（如果适用）：交点在纹理上的 UV 坐标。
        console.log('intersects', intersects);
        const markOBJ = intersects.find((item) => item.object.name === 'mark')
        // 点击之后，切换纹理
        // const infoObj = sceneInfoObj
        // 切换贴图场景
        const nextScene = markOBJ.object.userData.attr
        setMaterialCube(sceneInfoObj[nextScene]);
    })
}

const myCube = createCube();
setMaterialCube(sceneInfoObj.one);
bindClick();