const hmr = require('../../lib/three-hmr')
const cache = hmr.cache(__filename)
const glslify = require('glslify')
// const EffectComposer = require('three-effectcomposer')(THREE);

const vertexShader = glslify('./shaders/circle/vertexShader.vert');
const fragmentShader = glslify('./shaders/circle/fragmentShader.frag');

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let dpr = window.devicePixelRatio;
let geometry;
let mesh;
let loader = new THREE.TextureLoader();

module.exports = class Circle {
  constructor() {}

  create(imgpass) {

    // Geometory作成
    let geometry = new THREE.IcosahedronGeometry(0.5, 4);

    // Material作成
    let material = new THREE.ShaderMaterial({
      uniforms: {
        'time': {
          type: 'f',
          value: 0.0
        },
        'resolution': {
          type: 'v2',
          value: new THREE.Vector2(windowWidth * dpr, windowHeight * dpr)
        },
        'textuer': {
          type: 't',
          value: loader.load(imgpass, function (tx) {
            tx.magFilter = THREE.NearestFilter;
            tx.minFilter = THREE.NearestFilter;
          })
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      //wireframe:true
    });

    material.side = THREE.DoubleSide; // 両面描画する


    mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  update(time) {
    mesh.material.uniforms.time.value = time;
    mesh.material.uniforms.textuer.value.needsUpdate = true;
    mesh.rotation.z += 0.001;
  }

};