import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Morocco + Western Sahara approximate outline coordinates (Three.js units, centered)
const moroccoPoints: [number, number][] = [
  [-4.5, 3.8], // Tangier area (NW, Mediterranean)
  [-3.8, 4.0], // near Ceuta
  [-2.5, 3.8], // NE Mediterranean coast
  [-1.0, 3.5], // Oujda area
  [0.2, 3.0], // Algeria border NE
  [0.8, 2.0], // Algeria border E
  [1.0, 0.5], // Algeria border mid-E
  [0.8, -0.5], // Algeria border SE
  [0.5, -1.5], // Algeria border S
  [0.2, -2.5], // towards Sahara
  [-0.2, -3.5], // Western Sahara E border
  [-0.5, -4.5], // Western Sahara SE
  [-1.2, -4.8], // Western Sahara S (Mauritania border)
  [-2.8, -4.5], // Atlantic coast S
  [-3.5, -3.5], // Atlantic coast SW
  [-4.0, -2.5], // Atlantic coast W
  [-4.3, -1.5], // Atlantic coast W
  [-4.6, -0.5], // Agadir area
  [-5.0, 0.5], // Atlantic coast
  [-5.3, 1.5], // Casablanca area
  [-5.5, 2.5], // Atlantic coast N
  [-5.6, 3.2], // Rabat area
  [-5.4, 3.9], // Cape Spartel area
  [-4.5, 3.8], // close shape back to Tangier
];

// ── Morocco map wireframe mesh ────────────────────────────────────────────────
function MoroccoMapMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const { geometry } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(moroccoPoints[0][0], moroccoPoints[0][1]);
    for (let i = 1; i < moroccoPoints.length; i++) {
      shape.lineTo(moroccoPoints[i][0], moroccoPoints[i][1]);
    }
    shape.closePath();

    const geo = new THREE.ShapeGeometry(shape, 32);
    return { geometry: geo };
  }, []);

  // Store original vertex positions for displacement
  const origPositions = useMemo(() => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    return new Float32Array(pos.array);
  }, [geometry]);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.15;
    const t = timeRef.current;

    if (meshRef.current) {
      // Gentle oscillation on Y axis — NO continuous Z rotation
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }

    // Animate Z displacement on the shape vertices
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const ox = origPositions[i];
      const oy = origPositions[i + 1];
      arr[i + 2] =
        Math.sin(ox * 0.4 + t) * 0.25 +
        Math.sin(oy * 0.3 + t * 0.7) * 0.2 +
        Math.sin((ox + oy) * 0.25 + t * 1.2) * 0.15 +
        Math.cos(ox * 0.6 - oy * 0.4 + t * 0.5) * 0.1;
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 5, 0, 0]}
      position={[0, -0.5, 0]}
    >
      <meshBasicMaterial
        color="#00c8e8"
        wireframe
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Morocco map glowing outline ───────────────────────────────────────────────
function MoroccoMapOutline() {
  const lineRef = useRef<THREE.LineLoop>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const points = moroccoPoints.map(([x, y]) => new THREE.Vector3(x, y, 0));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.15;
    const t = timeRef.current;
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <lineLoop
      ref={lineRef}
      geometry={geometry}
      rotation={[-Math.PI / 5, 0, 0]}
      position={[0, -0.5, 0.05]}
    >
      <lineBasicMaterial
        color="#00e5ff"
        transparent
        opacity={0.85}
        linewidth={2}
      />
    </lineLoop>
  );
}

// ── Faint background copy of the map shape ────────────────────────────────────
function MoroccoMapBack() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const { geometry } = useMemo(() => {
    const scale = 1.1;
    const shape = new THREE.Shape();
    shape.moveTo(moroccoPoints[0][0] * scale, moroccoPoints[0][1] * scale);
    for (let i = 1; i < moroccoPoints.length; i++) {
      shape.lineTo(moroccoPoints[i][0] * scale, moroccoPoints[i][1] * scale);
    }
    shape.closePath();
    const geo = new THREE.ShapeGeometry(shape, 32);
    return { geometry: geo };
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.15;
    const t = timeRef.current;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 5, 0, 0]}
      position={[0, -0.5, -3]}
    >
      <meshBasicMaterial
        color="#3b5fd4"
        wireframe
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Floating particles ────────────────────────────────────────────────────────
function Particles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return { geometry: geo };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.elapsedTime;
      pointsRef.current.rotation.y = t * 0.012;
      pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.04;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#00e5ff"
        size={0.08}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Main Canvas export ────────────────────────────────────────────────────────
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <MoroccoMapBack />
      <MoroccoMapMesh />
      <MoroccoMapOutline />
      <Particles count={140} />
      <fog attach="fog" args={["#060b1a", 18, 35]} />
    </Canvas>
  );
}
