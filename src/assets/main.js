import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(10, 20, 10);
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf3f2e9 );

const light1 = new THREE.DirectionalLight(0xefefef, 5);
light1.position.set(5, 5, 5).normalize();
scene.add(light1);
scene.add(new THREE.DirectionalLightHelper(light1));
const light2 = new THREE.DirectionalLight(0xefefef, 5);
light2.position.set(-5, -5, -5).normalize();
scene.add(light2);
scene.add(new THREE.DirectionalLightHelper(light2));
scene.add(new THREE.AmbientLight(0x333333));

scene.add(new THREE.GridHelper(15, 30));
scene.add(new THREE.AxesHelper(5));

new GLTFLoader().load("../docs/models/PixelCamera-Full.glb", (p6p) => {
  p6p.scene.traverse((p6pobj) => {
    if(p6pobj.isMesh){}
  });
  scene.add(p6p.scene);
});

const renderer = new THREE.WebGLRenderer( { antialias: true } );
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement)
document.body.appendChild( renderer.domElement );








const tick = () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick()