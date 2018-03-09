global.THREE = require('three');
const createBackground = require('three-vignette-background');
const Stats = require('stats.js');
const PostEffect = require('./src/js/posteffect.js');
const Circle = require('./src/js/circle.js');

const clock = new THREE.Clock();
const loader = new THREE.TextureLoader();

let time = 0.0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let aspect = windowWidth / windowHeight;

const app = {
  renderer: new THREE.WebGLRenderer(),
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 0.1, 1000)
};
const body = document.getElementsByTagName('body')[0];

app.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);
app.renderer.setPixelRatio(window.devicePixelRatio || 1);

// canvasをbodyに追加
body.appendChild(app.renderer.domElement);

// canvasをリサイズ
app.renderer.setSize(windowWidth, windowHeight);

let background = createBackground({
  noiseAlpha:0.1,
  colors:[ '#333333', '#000000' ]
});
app.scene.add(background)

//LIGHTS
let light = new THREE.AmbientLight(0xffffff, 1.0);
app.scene.add(light);

let dlight = new THREE.DirectionalLight(0xffffff,1.0);
app.scene.add(dlight);

app.camera.position.z = 1.5;

let stats = new Stats();
//body.appendChild(stats.dom);

const posteffect = new PostEffect(app);
const composer = posteffect.getComposer();

const circle1 = new Circle();
const mesh1 = circle1.create('src/assets/images/tx.jpg');
app.scene.add(mesh1);

const circle2 = new Circle();
const mesh2 = circle2.create('src/assets/images/tx2.jpg');
mesh2.position.set(1.0,0.2,-1);
app.scene.add(mesh2);

const circle3 = new Circle();
const mesh3 = circle2.create('src/assets/images/tx2.jpg');
mesh3.position.set(-1.0,0.2,-1);
app.scene.add(mesh3);

render();

//リサイズイベント
window.addEventListener('resize', function() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  app.renderer.setSize(windowWidth, windowHeight);
  app.camera.aspect = windowWidth / windowHeight;
  app.camera.updateProjectionMatrix();
  posteffect.update(new THREE.Vector2(windowWidth, windowHeight));
}, false );


function render() {
  time = clock.getElapsedTime();
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  stats.update();
  //posteffect.update();
  mesh1.material.uniforms.time.value = time;
  mesh2.material.uniforms.time.value = time*0.6;
  mesh3.material.uniforms.time.value = time*-0.6;
  mesh1.position.y += Math.cos(time)*0.0025;
  mesh2.position.y += Math.cos(time * 1.2)*0.0025;
  mesh3.position.y += Math.cos(time*1.2)*0.0025;
  mesh1.rotation.z += 0.0001;
  mesh2.rotation.z -= 0.0001;
  mesh3.rotation.z += 0.0001;




  composer.render();
  composer.passes[1].uniforms.time.value = time;
  requestAnimationFrame(render);
}