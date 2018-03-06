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

module.exports = class Circle {
  constructor() {
    //空のgeometry
    geometry = new THREE.Geometry();
  }

  create() {

    for (let i = 0; i < 10; i++) {
      let x = Math.random() * 3 - 1.5;
      let y = Math.random() * 3 - 1.5;
      let z = Math.random() * 3 - 1.5;


      // Mesh作成
      let meshTemp = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.3, 4)
      );

      meshTemp.position.set(x, y, z);

      geometry.mergeMesh(meshTemp);
    }


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
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      //wireframe:true
    });


    mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  update(time) {
    mesh.material.uniforms.time.value = time;
    //mesh.rotation.z += 0.01;
  }

};