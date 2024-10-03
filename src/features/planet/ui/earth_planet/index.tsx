import { useFrame, useLoader } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import EarthDayMap from "../../../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../../../assets/textures/8k_earth_clouds.jpg";
import { OrbitControls, Stars } from "@react-three/drei";

interface Props {
  isModalHide: boolean;
  earthZoom: number;
}

const EarthPlanet = ({ isModalHide, earthZoom }: Props) => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const [hideOrbitControls, setHideOrbitControls] = useState(true);

  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const reff = useRef<any>();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 12;
    cloudsRef.current.rotation.y = elapsedTime / 12;
  });

  const resetCameraPosition = () => {
    if (reff.current !== undefined && reff.current !== null) {
      reff.current.reset();
    }
  };

  const toggleHideOrbitControls = useCallback(() => {
    setHideOrbitControls(isModalHide);
  }, [isModalHide]);

  useEffect(() => {
    if (!hideOrbitControls) {
      resetCameraPosition();
    }
  }, [hideOrbitControls]);

  useEffect(() => {
    resetCameraPosition();
    toggleHideOrbitControls();
  }, [isModalHide, toggleHideOrbitControls]);

  const handleZoom = (zoom: number) => {
    earthRef.current.scale.z = zoom;
    earthRef.current.scale.x = zoom;
    earthRef.current.scale.y = zoom;

    cloudsRef.current.scale.z = zoom;
    cloudsRef.current.scale.x = zoom;
    cloudsRef.current.scale.y = zoom;
  };

  useEffect(() => {
    handleZoom(earthZoom);
  }, [earthZoom]);

  return (
    <>
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={100} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade
      />
      <mesh ref={cloudsRef} scale={[2.5, 2.5, 2.5]}>
        <sphereGeometry args={[1.005, 64, 32]} />
        <meshPhongMaterial
          color={"white"}
          map={cloudsMap}
          opacity={0.4}
          depthWrite
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} scale={[2.5, 2.5, 2.5]}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        {hideOrbitControls ? (
          <OrbitControls
            ref={reff}
            enableZoom
            enablePan
            enableRotate
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
          />
        ) : null}
      </mesh>
    </>
  );
};

export { EarthPlanet };
