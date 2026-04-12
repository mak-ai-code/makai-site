"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function Shard() {
  const mesh = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.8, 0), []);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.12;
    mesh.current.rotation.y = t * 0.18;
    mesh.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });
  return (
    <mesh ref={mesh} geometry={geo}>
      <meshStandardMaterial
        color="#0a0a0a"
        metalness={1}
        roughness={0.22}
        flatShading
        wireframe={false}
      />
    </mesh>
  );
}

function Edges() {
  const ref = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.82, 0);
    return new THREE.EdgesGeometry(base);
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });
  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#3a3a3a" transparent opacity={0.55} />
    </lineSegments>
  );
}

export function FacetedM() {
  return (
    <div className="absolute inset-0 -z-10 opacity-90">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f5f5f5" />
          <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#888" />
          <Shard />
          <Edges />
        </Suspense>
      </Canvas>
    </div>
  );
}
