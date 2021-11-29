import "./App.css";
import React, { Suspense, useEffect ,useState} from "react";
import Bounce from "react-reveal/Bounce";
import { Canvas, useThree } from "@react-three/fiber";
import Scene from "./Body";
// import Sky from "./Setup/Sky";
import Lights from "./Setup/Lights";
import Particles from "react-particles-js";
// import { Stats } from "./Stats";
import { Stats } from "@react-three/drei";
import {
  Stars,
  Loader,
  OrbitControls,
  Plane,
  PointerLockControls,
} from "@react-three/drei";
import { AmbientLight } from "three";
import Soldier from "./Character";
import { Debug, Physics, useBox, useSphere } from "@react-three/cannon";
import { RoundedBoxGeometry } from "three-stdlib";
import { Player } from "./Player";

import { useControls } from "leva";
import { useStore } from "./store";
import { useToggle } from "./useToggle";

// Creates a crate that catches the spheres

// Spheres falling down
function InstancedSpheres({ count = 10 }) {
  const { viewport } = useThree();
  const [ref, api] = useSphere((index) => ({
    mass: 100,
    position: [4 - Math.random() * 4, 50, 0, 0],
    args: [1, 32, 32],
  }));
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
      // geometry={new RoundedBoxGeometry(10, 10, 10, 6, 2)}
    >
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshLambertMaterial color="#ff7b00" />
    </instancedMesh>
  );
}

const DebugPhysics = (props) => {
  const debug = useStore((state) => state.debug);
  const color = useStore((state) => state.color);
  console.log(color);

  return debug ? <Debug color={color}>{props.children}</Debug> : props.children;
};
const App = () => {
  const [colliders , setColliders] = useState(null)
  const ToggledDebug = useToggle(Debug, "debug");
  useEffect(()=>{console.log(colliders)},[colliders]);
  return (
    <>
      {/* <div id="selector">
        <div className="welcome">
          <Bounce top>
            <h1 style={{ fontSize: "45px", fontWeight: "500" }}>
              Welcome to <span>Game!</span>
            </h1>
          </Bounce>
          {window.innerWidth > 767 ? (
            <Bounce bottom>
              <p>Click to play</p>
              <h3>Controls </h3>
              <p>
                Move: WASD
                <br />
                Jump: SPACE
                <br />
                Look: MOUSE
                <br />
                Sprint: Left Shift
              </p>
            </Bounce>
          ) : (
            <Bounce bottom>
              <p>Sorry!</p>
              <p>This website does not support mobile devices yet.</p>
              <p>
                Instead click <a>Here to go to my basic portfolio</a>
              </p>
            </Bounce>
          )}
        </div>
        <Particles
          id="particles-js"
          params={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
              color: {
                value: "#91fff8",
              },
              opacity: {
                value: 0.5,
                anim: {
                  enable: true,
                },
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: true,
                  speed: 3,
                },
              },
              line_linked: {
                enable: false,
              },
              move: {
                speed: 0.2,
              },
            },
          }}
        />
      </div> */}
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "black",
        }}
        camera={{ position: [0, 10, -5], fov: 45 }}
        id="canvas"
        shadowMap
         frameloop="demand"
         mode="concurrent"
        shadows
      >
        {/* <fog attach="fog" args={["#0d1a26", 60, 100]} /> */}
        <ambientLight />

        <Suspense fallback={null}>
          <Physics
            gravity={[0, -50, 0]}
            defaultContactMaterial={{ restitution: 0.5 }}
          >
            <DebugPhysics>
              <Scene setColliders = {setColliders} />
              <Soldier pose={0} colliders = {colliders}/>
              {/* <Player /> */}
              <InstancedSpheres />
            </DebugPhysics>
          </Physics>
        </Suspense>
        <Stars
          radius={160}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          />
        {/* <Lights /> */}
        <OrbitControls
          makeDefault
          enableDamping
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          maxPolarAngle={Math.PI / 2 - 0.05}
          />
        {/* <PointerLockControls /> */}
          <Stats/>
      </Canvas>
      <Editor />
      <Loader
        containerStyles={{
          background: "#222",
        }} // Flex layout styles
        innerStyles={{
          backgroundColor: "#3800AE",
          width: "50vw",
          height: "2rem",
        }} // Inner container styles
        barStyles={{
          backgroundColor: "#5708FF",
          height: "2rem",
        }} // Loading-bar styles
        dataInterpolation={(p) => `${p.toFixed(2)}%`}
        initialState={(active) => active}
        dataStyles={{
          color: "#fff",
          fontSize: "25px",
          fontFamily: "sans-serif",
          fontWeight: "800",
          textTransform: "uppercase",
          display: "none",
        }}
      />
    </>
  );
};

export default App;

function Editor() {
  const debugPhysics = useStore((state) => state.debug);
  const { debug, color, runVelocity } = useControls({
    debug: debugPhysics,
    color: {
      value: "#ffffffff",
      render: (get) => get("debug"),
    },
    runVelocity: 3,
  });

  const changeState = useStore((state) => state.changeDebug);

  useEffect(() => {
    changeState(debug, color, runVelocity);
  });

  return null;
}
