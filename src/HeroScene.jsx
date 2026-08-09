import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const CYAN = '#4ad7d1';
const VIOLET = '#8e7dff';
const BLUE = '#4ea5ff';

const pointer = { x: 0, y: 0 };

function useWindowPointer(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    const onMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled]);
}

function CoreOrb({ reducedMotion }) {
  const root = useRef();
  const wire = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const drift = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (reducedMotion || !root.current) return;
    const t = state.clock.elapsedTime;

    drift.current.x = THREE.MathUtils.lerp(drift.current.x, pointer.x * 0.45, 0.035);
    drift.current.y = THREE.MathUtils.lerp(drift.current.y, pointer.y * 0.3, 0.035);

    root.current.position.set(2.15 + drift.current.x, 0.2 + drift.current.y, 0);
    root.current.rotation.y = t * 0.14 + pointer.x * 0.2;
    root.current.rotation.x = 0.2 + Math.sin(t * 0.22) * 0.1 + pointer.y * 0.12;

    if (wire.current) {
      wire.current.rotation.y = -t * 0.32;
      wire.current.rotation.z = t * 0.12;
    }
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.42;
      ringA.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.35) * 0.2;
    }
    if (ringB.current) {
      ringB.current.rotation.y = -t * 0.28;
      ringB.current.rotation.x = 0.7 + Math.cos(t * 0.25) * 0.15;
    }
  });

  return (
    <group ref={root} position={[2.15, 0.2, 0]} scale={1.35}>
      <Float speed={reducedMotion ? 0 : 1.25} rotationIntensity={0.18} floatIntensity={0.5}>
        <mesh ref={wire}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={0.52}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={VIOLET}
            emissive={VIOLET}
            emissiveIntensity={0.65}
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      <mesh ref={ringA}>
        <torusGeometry args={[1.7, 0.016, 14, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.45} depthWrite={false} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.15, 0.012, 14, 128]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.32} depthWrite={false} />
      </mesh>
    </group>
  );
}

function OrbitNodes({ reducedMotion }) {
  const group = useRef();
  const nodes = useMemo(
    () => Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * 2.45,
          Math.sin(angle * 1.8) * 0.55,
          Math.sin(angle) * 1.65,
        ],
        color: i % 2 ? CYAN : VIOLET,
        scale: i % 3 === 0 ? 1.35 : 1,
      };
    }),
    [],
  );

  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.16;
    group.current.rotation.z = Math.sin(t * 0.2) * 0.18;
    group.current.position.x = 2.15 + pointer.x * 0.2;
    group.current.position.y = 0.2 + pointer.y * 0.12;
  });

  return (
    <group ref={group} position={[2.15, 0.2, 0]} scale={1.35}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} scale={node.scale}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function StarField({ count = 420, reducedMotion }) {
  const points = useRef();
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(CYAN),
      new THREE.Color(VIOLET),
      new THREE.Color(BLUE),
      new THREE.Color('#c5d4e8'),
    ];

    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 1;

      const c = palette[i % palette.length];
      const shade = 0.55 + Math.random() * 0.45;
      col[i * 3] = c.r * shade;
      col[i * 3 + 1] = c.g * shade;
      col[i * 3 + 2] = c.b * shade;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;
    points.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    points.current.position.x = pointer.x * 0.35;
    points.current.position.y = pointer.y * 0.2;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AmbientGlows() {
  return (
    <>
      <mesh position={[-4.2, 1.6, -5]}>
        <sphereGeometry args={[2.4, 24, 24]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.07} depthWrite={false} />
      </mesh>
      <mesh position={[4.8, -1.8, -6]}>
        <sphereGeometry args={[2.8, 24, 24]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <mesh position={[0.5, -2.8, -4]}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </>
  );
}

function Scene({ reducedMotion }) {
  return (
    <>
      <ambientLight intensity={0.75} />
      <pointLight position={[5, 4, 4]} intensity={1.25} color={CYAN} />
      <pointLight position={[-5, -2, -2]} intensity={0.95} color={VIOLET} />
      <AmbientGlows />
      <StarField reducedMotion={reducedMotion} />
      <CoreOrb reducedMotion={reducedMotion} />
      <OrbitNodes reducedMotion={reducedMotion} />
    </>
  );
}

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useWindowPointer(!reducedMotion);

  return (
    <div className="scene-bg" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
