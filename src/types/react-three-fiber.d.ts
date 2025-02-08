import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      planeGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.PlaneGeometry,
        typeof THREE.PlaneGeometry
      >;
      meshBasicMaterial: ReactThreeFiber.MaterialNode<
        THREE.MeshBasicMaterial,
        typeof THREE.MeshBasicMaterial
      >;
    }
  }
}
export {};
