import * as THREE from "three";
import { usePlane } from "@react-three/cannon";

export const Floor = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshPhongMaterial color="#22f222" />
    </mesh>
  );
};
