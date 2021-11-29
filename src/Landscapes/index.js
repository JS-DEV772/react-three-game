/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import { MeshBVH, MeshBVHVisualizer } from "three-mesh-bvh";
// import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { ColorifyShader } from "three-stdlib";
export default function Map(props) {
  const group = useRef();
  const meshes = useRef();
  const [collider, setCollider] = useState(null);
  const [collision, setCollision] = useState(null);
  const { nodes, materials } = useGLTF("/models/map.glb");
  console.log(nodes)
  var colliders = new THREE.Object3D();
  var visualizer, environment = new THREE.Group();;
  THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
  THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
  THREE.Mesh.prototype.raycast = acceleratedRaycast;

  const [init, setInit] = useState(false);

  useEffect(() => {
    new GLTFLoader().load("/polygonia-low-poly-city-pack/source/Polygonia_City_Pack.fbx", (res) => {
      const gltfScene = res.scene;
      gltfScene.scale.setScalar(1.1);
      const box = new THREE.Box3();
      box.setFromObject(gltfScene);
      box.getCenter(gltfScene.position).negate();

      gltfScene.updateMatrixWorld(true);
      // visual geometry setup
      const toMerge = {
      };
      gltfScene.traverse((c) => {
        if (c.isMesh) {
          const hex = c.material.color.getHex();
          toMerge[hex] = toMerge[hex] || [];
          toMerge[hex].push(c);
        }
      });
      for (const hex in toMerge) {
        const arr = toMerge[hex];
        const visualGeometries = [];
        arr.forEach((mesh) => {
          if (mesh.material.emissive.r !== 0) environment.attach(mesh);
          else {
            const geom = mesh.geometry.clone();
            geom.applyMatrix4(mesh.matrixWorld);
            visualGeometries.push(geom);
          }
        });
        if (visualGeometries.length) {
          const newGeom = BufferGeometryUtils.mergeBufferGeometries(visualGeometries);
          const newMesh = new THREE.Mesh(newGeom, new THREE.MeshStandardMaterial({
            color: parseInt(hex),
            shadowSide: 2
          }));
          newMesh.castShadow = true;
          newMesh.receiveShadow = true;
          newMesh.material.shadowSide = 2;
          environment.add(newMesh);
        }
      }
      // collect all geometries to merge
      const geometries = [];
      environment.updateMatrixWorld(true);
      environment.traverse((c) => {
        if (c.geometry) {
          const cloned = c.geometry.clone();
          cloned.applyMatrix4(c.matrixWorld);
          for (const key in cloned.attributes) if (key !== 'position') cloned.deleteAttribute(key);
          geometries.push(cloned);
        }
      });
      // create the merged geometry
      const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
      mergedGeometry.boundsTree = new MeshBVH(mergedGeometry, { lazyGeneration: true });
      let collider = new THREE.Mesh(mergedGeometry);
      collider.material.wireframe = true;
      collider.material.opacity = 0.5;
      collider.material.transparent = true;
      visualizer = new MeshBVHVisualizer(collider, 50);
      setCollider(collider)
      console.log(collider)
      // scene.add(visualizer);
      // scene.add(collider);
      // scene.add(environment);
      setInit(true);
      meshes.current.add(collider)
      // meshes.current.add(visualizer)
      // meshes.current.add(environment)
      props.setColliders(collider);
    });

  }, []);
  return (
    <group
      scale={1}
      rotation={[0, 0, 0]}
      ref={group}
      {...props}
      dispose={null}
    >
      <group
        ref={meshes}
        rotation={[0, 0, 0]}
        // scale={[0.01, 0.01, 0.01]}
        position={[0, 0, 0]}
      >

        {/* <group
          scale={-0.0071}
          position={[-5.62, -11.85, 1.4]}
          rotation={[0, Math.PI, Math.PI]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_canals_city_mat001_0.geometry}
            material={nodes.city_sample_canals_city_mat001_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_earth_city_mat_0.geometry}
            material={materials.city_mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_floor_sidewalk_mat_0.geometry}
            material={materials.sidewalk_mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_1_city_mat002_0.geometry}
            material={nodes.city_sample_houses_1_city_mat002_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_1_city_mat002_0001.geometry}
            material={nodes.city_sample_houses_1_city_mat002_0001.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_1_city_mat002_0002.geometry}
            material={nodes.city_sample_houses_1_city_mat002_0002.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_1_city_mat002_0003.geometry}
            material={nodes.city_sample_houses_1_city_mat002_0003.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_2_city_mat003_0.geometry}
            material={nodes.city_sample_houses_2_city_mat003_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_2_city_mat003_0001.geometry}
            material={nodes.city_sample_houses_2_city_mat003_0001.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_2_city_mat003_0002.geometry}
            material={nodes.city_sample_houses_2_city_mat003_0002.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_2_city_mat003_0003.geometry}
            material={nodes.city_sample_houses_2_city_mat003_0003.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_2_city_mat003_0004.geometry}
            material={nodes.city_sample_houses_2_city_mat003_0004.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_3_city_mat004_0.geometry}
            material={nodes.city_sample_houses_3_city_mat004_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_houses_3_city_mat004_0001.geometry}
            material={nodes.city_sample_houses_3_city_mat004_0001.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_streets_city_mat005_0.geometry}
            material={nodes.city_sample_streets_city_mat005_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_streets_city_mat005_0001.geometry}
            material={nodes.city_sample_streets_city_mat005_0001.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.city_sample_streets_city_mat005_0002.geometry}
            material={nodes.city_sample_streets_city_mat005_0002.material}
          />
        </group> */}
        <group
          position={[407.62, 590.39, -100.55]}
          rotation={[1.89, 0.88, -2.05]}
          scale={[100, 100, 100]}
        >
          <group rotation={[Math.PI / 2, 0, 0]} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/map.glb");
