import * as THREE from 'three';
import * as CANNON from "cannon-es";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//This class imports blender models in GLTF format and assigns them a hitbox

class importModels {
	init(modelPath, scene, world, material, q, modelscale,xPosition,yPosition,zPosition,xScale,yScale,zScale) {
        const loaderStone = new GLTFLoader();
        loaderStone.load(modelPath, 
        (gltf) => {
            const Mesh = gltf.scene;
            Mesh.scale.set(Mesh.scale.x * modelscale, Mesh.scale.y * modelscale, Mesh.scale.z * modelscale);
            Mesh.position.set(xPosition, yPosition,zPosition);
            Mesh.rotateY(Math.PI/2);
            scene.add(Mesh);
            //hit box 
            const cubeShapeTree = new CANNON.Box(new CANNON.Vec3(xScale,yScale,zScale))//must be the double from gemoetry
            const cubeBody = new CANNON.Body({
                mass: 0, // mass = 0 makes the body static
                material: material,
                shape: new CANNON.Plane(),
                quaternion: new CANNON.Quaternion(-q._x, q._y, q._z, q._w)
            })
            cubeBody.addShape(cubeShapeTree)
            cubeBody.position.copy(Mesh.position);
            world.addBody(cubeBody);
        });
    }
}
export default importModels;