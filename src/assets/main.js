import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(10, 20, 10);
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0efe7 );

const light1 = new THREE.DirectionalLight(0xefefef, 10);
light1.position.set(5, 5, 5).normalize();
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xefefef, 10);
light2.position.set(-5, -5, -5).normalize();
scene.add(light2);
scene.add(new THREE.AmbientLight(0xffffff));

scene.add(new THREE.GridHelper(15, 30));

let p8pmesh;
let p7pmesh;
let p6pmesh;

//const dracoLoader = new DRACOLoader();
//dracoLoader.setDecoderPath('../PixelCameraUnit/draco/');
const loader = new GLTFLoader();
//loader.setDRACOLoader(dracoLoader);

  //loader.load("../public/models/Pixel6Pro.glb", (p6p) => {
  loader.load("../PixelCameraUnit/models/Pixel6Pro-ble.glb", (p6p) => {
    p6p.scene.traverse((p6pobj) => {
    if(p6pobj.isMesh){}
  });
  p6p.scene.position.set(4,0,0);
  p6p.scene.rotation.y = 90 * (Math.PI / 180);
  p6pmesh = p6p.scene;
  scene.add(p6p.scene);
},
(xhr) =>  {
  document.getElementById("p6ploaded").textContent = `Pixel 6 Pro is ${Math.round((xhr.loaded / xhr.total * 100) * 100) / 100}% loaded`;
},
(error) => {
  console.log(error)
});
  //loader.load("../public/models/Pixel7Pro.glb", (p7p) => {
  loader.load("../PixelCameraUnit/models/Pixel7Pro-ble.glb", (p7p) => {
  p7p.scene.traverse((p7pobj) => {
    if(p7pobj.isMesh){}
  });
  p7p.scene.position.set(0,0,0);
  p7p.scene.rotation.y = 90 * (Math.PI / 180);
  p7pmesh = p7p.scene;
  scene.add(p7p.scene);
},
(xhr) =>  {
  document.getElementById("p7ploaded").textContent = `Pixel 7 Pro is ${Math.round((xhr.loaded / xhr.total * 100) * 100) / 100}% loaded`;
},
(error) => {
  console.log(error)
});
//loader.load("../public/models/Pixel8Pro.glb", (p8p) => {
loader.load("../PixelCameraUnit/models/Pixel8Pro-ble.glb", (p8p) => {
    p8p.scene.traverse((p8pobj) => {
    if(p8pobj.isMesh){}
  });
  p8p.scene.position.set(-4,0,0);
  p8p.scene.rotation.y = 90 * (Math.PI / 180);
  p8pmesh = p8p.scene;
  scene.add(p8p.scene);
},
(xhr) =>  {
  document.getElementById("p8ploaded").textContent = `Pixel 8 Pro is ${Math.round((xhr.loaded / xhr.total * 100) * 100) / 100}% loaded`;
},
(error) => {
  console.log(error)
});

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio(window.devicePixelRatio);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement)
document.body.appendChild( renderer.domElement );

var postext = "";
var rottextx = "";
var rottexty = "";
var rottextz = "";

let isclick6 = 1;
let isclick7 = 1;
let isclick8 = 1;

let i6 = 10;
let i7 = 10;
let i8 = 10;

let scale6 = 0.04;
let scale7 = 0.04;
let scale8 = 0.04;

let mode = 30;
let modecache = 30;
let modei = 10;
let movepos6 = 0;
let movepos7 = 0;
let movepos8 = 0;

const tick = () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  controls.update();
  requestAnimationFrame(tick);

  postext = `Pos : ${Math.round(camera.position.x)}, ${Math.round(camera.position.y)}, ${Math.round(camera.position.z)}`;
  rottexty = camera.rotation.x / (Math.PI / 180);
  rottextx = -1 * (Math.round(camera.rotation.x / (Math.PI /180)));
  rottexty = Math.round(camera.rotation.y / (Math.PI /180));
  rottextz = -1 * (Math.round(camera.rotation.z / (Math.PI / 180)));
  if (rottextz < 0){
    rottextz = 360 + rottextz;
  }
  if (rottextx < 0){
    rottextz = 360 - rottextz;
  }
  document.getElementById("postext").textContent =  postext;
  document.getElementById("rottext").textContent =  `Rot : ${rottextx}, ${rottexty}, ${rottextz}`;  
  if (i6 < 10){
    scaling(p6pmesh, scale6);
    i6++;
  }
  if (i7 < 10){
    scaling(p7pmesh, scale7);
    i7++;
  }
  if (i8 < 10){
    scaling(p8pmesh, scale8);
    i8++;
  }
  if (mode != modecache){
    modedetect();
  }
  if (modei < 10){
    modeselect();
  }
  modecache = mode;
  renderer.render(scene, camera);
}
tick()

function modedetect(){
  //6:2, 7:3, 8:5  
  movepos6 = 0;
  movepos7 = 0;
  movepos8 = 0;
  if (mode == 2){
    if (modecache == 1){
      movepos6 = 0;
      p6pmesh.position.x = 0;
    }
    else if (modecache == 6 || modecache == 10){
      movepos6 = -0.3;
    }
  }
  else if (mode == 3){
    if (modecache == 1){
      movepos7 = 0;
      p7pmesh.position.x = 0;
    }
    else if (modecache == 6){
      movepos7 = 0.3;
    }
    else if (modecache == 15){
      movepos7 = -0.3;
    }
  }
  else if (mode == 5){
    if (modecache == 1){
      movepos8 = 0;
      p8pmesh.position.x = 0;
    }
    else if (modecache == 10 || modecache == 15){
      movepos8 = 0.3;
    }
  }

  else if (mode == 6){
    if (modecache == 2){
      movepos6 = 0.3;
      p7pmesh.position.x = -3;
    }
    else if (modecache == 3){
      movepos7 = -0.3;
      p6pmesh.position.x = 3;
    }
    else if (modecache == 30){
      movepos6 = -0.1;
      movepos7 = -0.3;
    }
  }
  else if (mode == 10){
    if (modecache == 2){
      movepos6 = 0.3;
      p8pmesh.position.x = -3;
    }
    else if (modecache == 3){
      movepos7 = -0.3;
      p6pmesh.position.x = 3;
    }
    else if (modecache == 5){
      movepos8 = -0.3;
      p6pmesh.position.x = 3;
    }
    else if (modecache == 30){
      movepos6 = -0.1;
      movepos8 = 0.1;
    }
  }
  else if (mode == 15){
    if (modecache == 3){
      movepos7 = 0.3;
      p8pmesh.position.x = -3;
    }
    else if (modecache == 5){
      movepos8 = -0.3;
      p7pmesh.position.x = 3;
    }
    else if (modecache == 30){
      movepos8 = 0.1;
      movepos7 = 0.3;
    }
  }
  else if (mode == 30){
    if (modecache == 6){
      movepos6 = 0.1;
      movepos7 = 0.3;
      p8pmesh.position.x = -4;
    }
    else if (modecache == 10){
      movepos6 = 0.1;
      movepos8 = -0.1;
      p7pmesh.position.x = 0;
    }
    else if (modecache == 15){
      movepos8 = -0.1;
      movepos7 = -0.3;
      p6pmesh.position.x = 4;
    }
  }
  modei = 0;
}

function modeselect(){
  p6pmesh.position.x += movepos6;
  p7pmesh.position.x += movepos7;
  p8pmesh.position.x += movepos8;
  modei++;
}

function scaling(mesh, scalenum){
  mesh.scale.x += scalenum;
  mesh.scale.y += scalenum;
  mesh.scale.z += scalenum;
}

window.click6 = () => {
  if (i6 == 10){
    switch(isclick6){
        case 0:
            document.getElementById("phonesbtn6").className = "phonesbtn-clicked";
            isclick6 = 1;
            scale6 = 0.1;
            i6 = 0;
            mode *= 2;
            break;
        case 1:
            document.getElementById("phonesbtn6").className = "phonesbtn";
            isclick6 = 0;
            scale6 = -0.1;
            i6 = 0;
            mode /= 2;
            break;
    }
  }
};

  window.click7 = () => {
    if (i7 == 10){
      switch(isclick7){
          case 0:
              document.getElementById("phonesbtn7").className = "phonesbtn-clicked";
              isclick7 = 1;
              scale7 = 0.1;
              i7 = 0;
              mode *= 3;
              break;
          case 1:
              document.getElementById("phonesbtn7").className = "phonesbtn";
              isclick7 = 0;
              scale7 = -0.1;
              i7 = 0;
              mode /= 3;
              break;
      }
    }
  };
  
window.click8 = () => {
  if (i8 == 10){
    switch(isclick8){
        case 0:
            document.getElementById("phonesbtn8").className = "phonesbtn-clicked";
            isclick8 = 1;
            scale8 = 0.1;
            i8 = 0;
            mode *= 5;
            break;
        case 1:
            document.getElementById("phonesbtn8").className = "phonesbtn";
            isclick8 = 0;
            scale8 = -0.1;
            i8 = 0
            mode /= 5;
            break;
    }
  }
  };