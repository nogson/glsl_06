const hmr = require('../../lib/three-hmr')
const cache = hmr.cache(__filename)
const glslify = require('glslify')
// const EffectComposer = require('three-effectcomposer')(THREE);

const vertexShader = glslify('./shaders/circle/vertexShader.vert');
const fragmentShader = glslify('./shaders/circle/fragmentShader.frag');

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let dpr = window.devicePixelRatio;
let mesh;
let group;

module.exports = class Circle {
  constructor() { 

    group = new THREE.Group();

  }

  create(pos) {

    //Geometryを作成
    var geometry = new THREE.IcosahedronGeometry(0.5,4);

    // Material作成
    let material = new THREE.ShaderMaterial({
      uniforms: {
        'time':{
          type:'f',
          value : 0.0
        },
        'resolution':{
          type:'v2',
          value:new THREE.Vector2(windowWidth * dpr,windowHeight * dpr)
        }      
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      //wireframe:true
    });
    // Mesh作成
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(pos.x,pos.y,pos.z);

    group.add(mesh);

    return group;
  }

  update(time){
    mesh.material.uniforms.time.value = time;
    mesh.rotation.z += 0.01;
  }

};