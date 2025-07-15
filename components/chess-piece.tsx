"use client";

import type * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function ChessPiece({
  position,
  rotation,
  scale = 1,
  color = "#ffffff",
  type = "pawn",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  type?: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const renderPawn = () => (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.3, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );

  const renderRook = () => (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.5, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.18, 0.3, Math.sin(angle) * 0.18]}
        >
          <boxGeometry args={[0.06, 0.15, 0.06]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );

  const renderKnight = () => (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.2]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.15, 0.15]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.25, 0.3, 0.35]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-0.08, 0.25, 0.25]}>
        <coneGeometry args={[0.03, 0.1, 8]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0.08, 0.25, 0.25]}>
        <coneGeometry args={[0.03, 0.1, 8]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );

  const renderBishop = () => (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.22, 0.4, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.02]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.02]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );

  const renderQueen = () => (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 0.5, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      {[
        0,
        Math.PI / 4,
        Math.PI / 2,
        (3 * Math.PI) / 4,
        Math.PI,
        (5 * Math.PI) / 4,
        (3 * Math.PI) / 2,
        (7 * Math.PI) / 4,
      ].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.15,
            0.4 + (i % 2) * 0.1,
            Math.sin(angle) * 0.15,
          ]}
        >
          <coneGeometry args={[0.03, 0.15 + (i % 2) * 0.1, 8]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );

  const renderKing = () => (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.1, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 0.5, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.18, 0.42, Math.sin(angle) * 0.18]}
        >
          <coneGeometry args={[0.04, 0.2, 8]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.03, 0.15, 0.03]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.08, 0.03, 0.03]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );

  const renderPiece = () => {
    switch (type) {
      case "rook":
        return renderRook();
      case "knight":
        return renderKnight();
      case "bishop":
        return renderBishop();
      case "queen":
        return renderQueen();
      case "king":
        return renderKing();
      default:
        return renderPawn();
    }
  };

  return (
    <group position={position} rotation={rotation} scale={scale} ref={meshRef}>
      {renderPiece()}
    </group>
  );
}
