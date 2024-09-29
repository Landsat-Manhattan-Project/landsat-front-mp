import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const ThreeCanvas = ({ children }: any) => {
  return (
    <Canvas>
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
};

export { ThreeCanvas };
