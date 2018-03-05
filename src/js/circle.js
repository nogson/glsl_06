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

module.exports = class Circle {
  constructor() { }

  create() {

    //Geometryを作成
    var geometry = new THREE.IcosahedronGeometry(0.5,1);

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
        },
        'uTimeScale': {
          type: 'f',
          value: 0.2 * Math.random() + 0.7
        },
        // uRadius: {
        //   type: 'f',
        //   value: this.geometryR[t] * this.comparison
        // },
        // // uColor: {
        // //   value: new THREE.Color(this.colorPalette[t])
        // // },
        // // uColor_2: {
        // //   value: new THREE.Color(this.colorPalette[t + 3])
        // // },
        // uTick: {
        //   type: 'f',
        //   value: 0
        // },
        // // uColorTick: {
        // //   type: 'f',
        // //   value: 0
        // // },
        // uWidth: {
        //   type: 'f',
        //   value: this.props.width
        // },
        // uOrbit: {
        //   type: 'f',
        //   value: this.orbit[t] * this.comparison
        // },
        // uNum: {
        //   type: 'f',
        //   value: t
        // },
        // uTex: {
        //   type: 't',
        //   value: this.circleBlurTex
        // },
        // uNoiseRadius: {
        //   type: 'f',
        //   value: 20 * this.comparison
        // },
        // uMousePos: {
        //   type: 'v2',
        //   value: new THREE.Vector2(0, 0)
        // },
        // uMouseVec: {
        //   type: 'v2',
        //   value: new THREE.Vector2(0, 0)
        // },
        // uAspect: {
        //   type: 'f',
        //   value: aspect
        // }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
    // Mesh作成
    mesh = new THREE.Mesh(geometry, material);
    console.log('mesh',mesh)
    return mesh;
  }

  update(time){
    mesh.material.uniforms.time.value = time;
  }

};