// sceneObj 的数据
export const sceneInfoObj = {
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
                rotation: [1.55, 0, 0], //旋转角度
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
                position: [-0.36, -0.16, -0.16],
                rotation: [1.55, 0, 0], //旋转角度
                targetAttr: 'three'
            },
            {
                name: 'landMark',
                imgUrl: 'other/landmark.png',
                wh: [0.05, 0.05], // 平面宽高
                position: [0.38, -0.18, 0.01],
                rotation: [1.55, 0, 0], //旋转角度
                targetAttr: 'one'
            }
        ]
    }
}