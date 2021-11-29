import { useFrame, useLoader } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import CameraControls from "./Setup/CameraControls";
import { Floor } from "./Setup/Floor";
import Map from "./Landscapes";
import { Heightmap } from "./Landscapes/Heightmap";

function Body(props) {
  const [colliders, setColliders] = useState(null);
  useEffect(() => {
    props.setColliders(colliders)
  },[colliders]);
  return (
    <>
      {/* <CameraControls icon={arrow} /> */}
      <Map setColliders={setColliders} />
      {/* <Heightmap
        elementSize={0.1525}
        position={[-85.2, -4, 74.5]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
      /> */}
      {/* <Floor position={[0, -0.55, 0]} /> */}
    </>
  );
}

export default Body;
