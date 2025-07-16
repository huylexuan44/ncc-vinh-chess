"use client";

import { Suspense, useRef, useState, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Sphere,
  Box,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Calendar,
  Users,
  Clock,
  Star,
  MapPin,
  Zap,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { ChessLogo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ChessPiece } from "@/components/chess-piece";
import { data } from "@/data/data";

function AnimatedSphere({ position, color, scale = 1 }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <Sphere ref={meshRef} position={position} scale={scale}>
        <MeshDistortMaterial color={color} distort={0.3} speed={2} />
      </Sphere>
    </Float>
  );
}

function FlyingDragon({ position, scale = 1, speed = 1, color = "#DC2626" }) {
  const dragonRef = useRef(null);
  const wingLeftRef = useRef(null);
  const wingRightRef = useRef(null);
  const tailRef = useRef(null);
  const neckRef = useRef(null);

  useFrame((state) => {
    if (dragonRef.current) {
      const time = state.clock.elapsedTime * speed;
      const radius = 4;

      dragonRef.current.position.x = position[0] + Math.sin(time) * radius;
      dragonRef.current.position.y =
        position[1] + Math.sin(time * 2) * 1.5 + Math.cos(time * 0.5) * 0.5;
      dragonRef.current.position.z = position[2] + Math.cos(time) * radius;

      dragonRef.current.rotation.y = time + Math.PI / 2;
      dragonRef.current.rotation.z = Math.sin(time * 2) * 0.3;
      dragonRef.current.rotation.x = Math.sin(time * 1.5) * 0.2;
    }

    if (wingLeftRef.current && wingRightRef.current) {
      const flapSpeed = 8;
      const flapAngle = Math.sin(state.clock.elapsedTime * flapSpeed) * 0.8;
      wingLeftRef.current.rotation.z = flapAngle;
      wingRightRef.current.rotation.z = -flapAngle;
      wingLeftRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * flapSpeed * 0.5) * 0.3;
      wingRightRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * flapSpeed * 0.5) * 0.3;
    }

    if (tailRef.current) {
      tailRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.4;
      tailRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 2) * 0.3;
    }

    if (neckRef.current) {
      neckRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      neckRef.current.rotation.y =
        Math.cos(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={dragonRef} scale={scale}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
          <meshStandardMaterial
            color={color}
            metalness={0.6}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh position={[0, 0.1, 0.3]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={color}
            metalness={0.6}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        <group ref={neckRef} position={[0, 0.1, 0.8]}>
          {[0, 0.2, 0.4].map((z, i) => (
            <mesh key={i} position={[0, 0, z]} rotation={[i * 0.1, 0, 0]}>
              <capsuleGeometry args={[0.12 - i * 0.02, 0.25, 6, 12]} />
              <meshStandardMaterial
                color={color}
                metalness={0.6}
                roughness={0.4}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
        </group>

        <mesh position={[0, 0.15, 1.4]}>
          <coneGeometry args={[0.18, 0.5, 8]} />
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh position={[0, 0.05, 1.65]}>
          <coneGeometry args={[0.08, 0.3, 8]} />
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh position={[-0.08, 0.22, 1.45]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[0.08, 0.22, 1.45]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={1.2}
          />
        </mesh>

        <mesh position={[-0.1, 0.35, 1.3]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.02, 0.15, 6]} />
          <meshStandardMaterial
            color="#7C2D12"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.1, 0.35, 1.3]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.02, 0.15, 6]} />
          <meshStandardMaterial
            color="#7C2D12"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <group ref={wingLeftRef} position={[-0.3, 0.2, 0.1]}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.03, 0.4, 6, 8]} />
            <meshStandardMaterial
              color="#7C2D12"
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[-0.3, -0.1, 0]} rotation={[0, 0.2, 0]}>
            <planeGeometry args={[0.8, 0.6]} />
            <meshStandardMaterial
              color="#DC2626"
              transparent
              opacity={0.8}
              side={2}
              emissive="#DC2626"
              emissiveIntensity={0.1}
            />
          </mesh>
          {[0.1, 0.3, 0.5].map((y, i) => (
            <mesh
              key={i}
              position={[-0.5, -y, 0]}
              rotation={[0, 0, 0.3 + i * 0.2]}
            >
              <capsuleGeometry args={[0.01, 0.2, 4, 6]} />
              <meshStandardMaterial
                color="#7C2D12"
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>

        <group ref={wingRightRef} position={[0.3, 0.2, 0.1]}>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.03, 0.4, 6, 8]} />
            <meshStandardMaterial
              color="#7C2D12"
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0.3, -0.1, 0]} rotation={[0, -0.2, 0]}>
            <planeGeometry args={[0.8, 0.6]} />
            <meshStandardMaterial
              color="#DC2626"
              transparent
              opacity={0.8}
              side={2}
              emissive="#DC2626"
              emissiveIntensity={0.1}
            />
          </mesh>
          {[0.1, 0.3, 0.5].map((y, i) => (
            <mesh
              key={i}
              position={[0.5, -y, 0]}
              rotation={[0, 0, -0.3 - i * 0.2]}
            >
              <capsuleGeometry args={[0.01, 0.2, 4, 6]} />
              <meshStandardMaterial
                color="#7C2D12"
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>

        <group ref={tailRef} position={[0, -0.1, -0.8]}>
          {[0, -0.3, -0.6, -0.9, -1.2].map((z, i) => (
            <mesh
              key={i}
              position={[0, -i * 0.05, z]}
              rotation={[i * 0.1, 0, 0]}
            >
              <capsuleGeometry args={[0.08 - i * 0.015, 0.25, 6, 8]} />
              <meshStandardMaterial
                color={i === 4 ? "#991B1B" : color}
                metalness={0.5}
                roughness={0.4}
                emissive={i === 4 ? "#991B1B" : color}
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
          {[0, -0.3, -0.6].map((z, i) => (
            <mesh
              key={i}
              position={[0, 0.1 - i * 0.02, z]}
              rotation={[-0.5, 0, 0]}
            >
              <coneGeometry args={[0.03, 0.1, 6]} />
              <meshStandardMaterial
                color="#7C2D12"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>

        {[0.6, 0.3, 0, -0.3].map((z, i) => (
          <mesh key={i} position={[0, 0.25 - i * 0.02, z]}>
            <coneGeometry args={[0.04, 0.15 - i * 0.02, 6]} />
            <meshStandardMaterial
              color="#7C2D12"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}

        <mesh position={[-0.15, -0.25, 0.2]} rotation={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.04, 0.2, 6, 8]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.15, -0.25, 0.2]} rotation={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.04, 0.2, 6, 8]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[-0.12, -0.25, -0.2]} rotation={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.04, 0.2, 6, 8]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.12, -0.25, -0.2]} rotation={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.04, 0.2, 6, 8]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Fire Breath Effect - more realistic */}
        <mesh position={[0, 0.05, 1.8]}>
          <coneGeometry args={[0.06, 0.4, 8]} />
          <meshStandardMaterial
            color="#FF4500"
            emissive="#FF4500"
            emissiveIntensity={1.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0, 0.05, 2.1]}>
          <coneGeometry args={[0.12, 0.3, 8]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function DragonTrail({ position, scale = 1 }) {
  const trailRef = useRef(null);

  useFrame((state) => {
    if (trailRef.current) {
      const time = state.clock.elapsedTime;
      trailRef.current.position.x = position[0] + Math.sin(time * 0.5) * 3;
      trailRef.current.position.y = position[1] + Math.sin(time) * 1;
      trailRef.current.position.z = position[2] + Math.cos(time * 0.5) * 3;
      trailRef.current.rotation.y = time;
    }
  });

  return (
    <group ref={trailRef} scale={scale}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 0.3]}>
          <sphereGeometry args={[0.05 - i * 0.005, 8, 8]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={0.5 - i * 0.05}
            transparent
            opacity={0.8 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function MagicalDragon({ position, scale = 1, speed = 1 }) {
  const dragonRef = useRef(null);
  const auraRef = useRef(null);

  useFrame((state) => {
    if (dragonRef.current) {
      const time = state.clock.elapsedTime * speed;
      const radius = 5;
      const height = 2;

      dragonRef.current.position.x = position[0] + Math.cos(time) * radius;
      dragonRef.current.position.y =
        position[1] + Math.sin(time * 3) * height + Math.sin(time) * 0.5;
      dragonRef.current.position.z = position[2] + Math.sin(time) * radius;

      dragonRef.current.rotation.y = time + Math.PI;
      dragonRef.current.rotation.z = Math.cos(time * 2) * 0.2;
    }

    if (auraRef.current) {
      auraRef.current.rotation.x = state.clock.elapsedTime * 2;
      auraRef.current.rotation.y = state.clock.elapsedTime * 1.5;
      auraRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 4) * 0.2
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={dragonRef} scale={scale}>
        {/* Magical Aura */}
        <mesh ref={auraRef}>
          <torusGeometry args={[0.8, 0.1, 8, 16]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#A855F7"
            emissiveIntensity={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.2, 1.8, 8]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.8}
            roughness={0.2}
            emissive="#8B5CF6"
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh position={[-0.5, 0.2, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial
            color="#A855F7"
            transparent
            opacity={0.7}
            emissive="#A855F7"
            emissiveIntensity={0.4}
            side={2}
          />
        </mesh>
        <mesh position={[0.5, 0.2, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial
            color="#A855F7"
            transparent
            opacity={0.7}
            emissive="#A855F7"
            emissiveIntensity={0.4}
            side={2}
          />
        </mesh>

        <mesh position={[0, 0.1, 1]}>
          <coneGeometry args={[0.2, 0.5, 8]} />
          <meshStandardMaterial
            color="#7C3AED"
            metalness={0.8}
            roughness={0.2}
            emissive="#7C3AED"
            emissiveIntensity={0.4}
          />
        </mesh>

        {[...Array(6)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 3) * 0.6,
              Math.sin((i * Math.PI) / 3) * 0.6,
              0,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#F59E0B"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function ChessBoard() {
  const squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isLight = (i + j) % 2 === 0;
      squares.push(
        <Box
          key={`${i}-${j}`}
          position={[i - 3.5, -1, j - 3.5]}
          args={[1, 0.1, 1]}
        >
          <meshStandardMaterial
            color={isLight ? "#E2E8F0" : "#4A5568"}
            metalness={0.1}
            roughness={0.8}
          />
        </Box>
      );
    }
  }

  return (
    <group>
      {squares}
      <ChessPiece
        position={[-3.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="rook"
      />
      <ChessPiece
        position={[-2.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="knight"
      />
      <ChessPiece
        position={[-1.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="bishop"
      />
      <ChessPiece
        position={[-0.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="queen"
      />
      <ChessPiece
        position={[0.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="king"
      />
      <ChessPiece
        position={[1.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="bishop"
      />
      <ChessPiece
        position={[2.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="knight"
      />
      <ChessPiece
        position={[3.5, 0, -3.5]}
        scale={0.6}
        color="#1A202C"
        type="rook"
      />

      <ChessPiece
        position={[3.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="rook"
      />
      <ChessPiece
        position={[2.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="knight"
      />
      <ChessPiece
        position={[1.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="bishop"
      />
      <ChessPiece
        position={[0.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="queen"
      />
      <ChessPiece
        position={[-0.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="king"
      />
      <ChessPiece
        position={[-1.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="bishop"
      />
      <ChessPiece
        position={[-2.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="knight"
      />
      <ChessPiece
        position={[-3.5, 0, 3.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.6}
        color="#F7FAFC"
        type="rook"
      />

      {/* Pawns */}
      {[-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5].map((x, i) => (
        <ChessPiece
          key={`pawn-black-${i}`}
          position={[x, 0, -2.5]}
          scale={0.5}
          color="#1A202C"
          type="pawn"
        />
      ))}
      {[-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5].map((x, i) => (
        <ChessPiece
          key={`pawn-white-${i}`}
          position={[x, 0, 2.5]}
          rotation={[0, Math.PI, 0]}
          scale={0.5}
          color="#F7FAFC"
          type="pawn"
        />
      ))}

      <AnimatedSphere position={[-5, 2, -5]} color="#5865F2" scale={0.3} />
      <AnimatedSphere position={[5, 3, 5]} color="#7289DA" scale={0.4} />
      <AnimatedSphere position={[-4, 1.5, 4]} color="#A855F7" scale={0.25} />
      <AnimatedSphere position={[4, 2.5, -4]} color="#EC4899" scale={0.35} />

      <FlyingDragon
        position={[0, 4, 0]}
        scale={0.8}
        speed={0.5}
        color="#DC2626"
      />
      <FlyingDragon
        position={[8, 5, 8]}
        scale={0.6}
        speed={0.7}
        color="#EF4444"
      />
      <FlyingDragon
        position={[-8, 3, -8]}
        scale={0.7}
        speed={0.3}
        color="#B91C1C"
      />
      <FlyingDragon
        position={[0, 6, -10]}
        scale={0.5}
        speed={0.9}
        color="#F87171"
      />
      <FlyingDragon
        position={[-6, 4, 6]}
        scale={0.9}
        speed={0.4}
        color="#DC2626"
      />

      <MagicalDragon position={[10, 6, 0]} scale={0.7} speed={0.6} />
      <MagicalDragon position={[-10, 5, 0]} scale={0.6} speed={0.8} />

      <DragonTrail position={[0, 3, 0]} scale={0.8} />
      <DragonTrail position={[5, 4, 5]} scale={0.6} />
      <DragonTrail position={[-5, 2, -5]} scale={0.7} />
    </group>
  );
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color="#5865F2"
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7289DA" />
      <spotLight position={[0, 15, 0]} intensity={1.2} color="#A855F7" />

      <pointLight position={[8, 5, 8]} intensity={0.8} color="#FF4500" />
      <pointLight position={[-8, 3, -8]} intensity={0.8} color="#DC2626" />
      <pointLight position={[0, 6, -10]} intensity={0.6} color="#F87171" />

      <Suspense fallback={null}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <ChessBoard />
        {/* <Center>
          <Text3D size={0.8} height={0.15} position={[0, 2, 0]}>
            CHESS NCC VINH
            <meshStandardMaterial
              color="#5865F2"
              metalness={0.8}
              roughness={0.2}
              emissive="#7289DA"
              emissiveIntensity={0.1}
            />
          </Text3D>
        </Center> */}
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}

const MemoScene3D = memo(Scene3D);

function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 animate-spin animate-reverse"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              ♔
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Đang tải...
          </h2>

          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChessTournamentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        } else {
          setIsVideoVisible(false);
          if (iframeRef.current) {
            const currentSrc = iframeRef.current.src;
            if (currentSrc.includes("autoplay=1")) {
              iframeRef.current.src = currentSrc.replace(
                "autoplay=1",
                "autoplay=0"
              );
            }
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => {
      if (videoSectionRef.current) {
        observer.unobserve(videoSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVideoVisible && iframeRef.current) {
      const baseUrl =
        "https://www.youtube.com/embed/r6zIGXun57U?si=QxkoXk6nhLVOJMe1";
      const params = "autoplay=1&mute=0&controls=1";
      iframeRef.current.src = `${baseUrl}&${params}`;
    }
  }, [isVideoVisible]);

  if (isLoading) {
    return <GlobalLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <header className="relative z-10 px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between backdrop-blur-sm bg-black/30 border-b border-indigo-500/20">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <ChessLogo className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
          <span className="text-white font-bold text-sm sm:text-lg lg:text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Chess NCC Vinh
          </span>
        </div>

        <nav className="hidden md:flex gap-4 lg:gap-6">
          <Link
            href="#tournament"
            className="text-white/80 hover:text-indigo-300 text-sm lg:text-base font-medium transition-colors"
          >
            Giải đấu
          </Link>
          <Link
            href="#players"
            className="text-white/80 hover:text-indigo-300 text-sm lg:text-base font-medium transition-colors"
          >
            Tuyển thủ
          </Link>
          <Link
            href="#schedule"
            className="text-white/80 hover:text-indigo-300 text-sm lg:text-base font-medium transition-colors"
          >
            Lịch thi đấu
          </Link>
          <Link
            href="#prizes"
            className="text-white/80 hover:text-indigo-300 text-sm lg:text-base font-medium transition-colors"
          >
            Giải thưởng
          </Link>
          <Link
            href="#register"
            className="text-white/80 hover:text-indigo-300 text-sm lg:text-base font-medium transition-colors"
          >
            Đăng ký
          </Link>
        </nav>

        <MobileNav />
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <MemoScene3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-4xl sm:text-6xl lg:text-8xl text-red-500/20 animate-pulse">
            🐉
          </div>
          <div className="absolute top-20 right-20 text-3xl sm:text-5xl lg:text-7xl text-red-600/20 animate-bounce">
            🐲
          </div>
          <div className="absolute bottom-20 left-20 text-5xl sm:text-7xl lg:text-9xl text-orange-500/20 animate-pulse">
            🐉
          </div>
          <div className="absolute bottom-10 right-10 text-2xl sm:text-4xl lg:text-6xl text-red-400/20 animate-bounce">
            🐲
          </div>
          <div className="absolute top-1/2 left-5 text-4xl sm:text-6xl lg:text-8xl text-red-500/20 animate-pulse">
            🐉
          </div>
          <div className="absolute top-1/3 right-5 text-3xl sm:text-5xl lg:text-7xl text-orange-600/20 animate-bounce">
            🐲
          </div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold border-0 shadow-lg shadow-indigo-500/25 text-xs sm:text-sm">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            GIẢI ĐẤU CỜ VUA QUỐC TẾ 2025
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            CHESS NCC VINH
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow-lg">
            Tham gia giải đấu cờ vua lớn nhất tháng với tổng giải thưởng lên đến
            1,000,000 $
          </p>
        </div>
      </section>

      <section
        id="players"
        className="py-12 sm:py-20 px-4 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Tuyển thủ hàng đầu
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto pb-4">
              Những cao thủ cờ vua xuất sắc nhất xóm sẽ tranh tài tại giải đấu
            </p>
            <p className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-4 mb-8 pt-4">
              <div className="flex items-center justify-center gap-3">
                <Users className="w-5 h-5 text-indigo-400" />
                <span className="text-white/80">
                  Tổng số tuyển đăng kí tham gia giải hiện tại:
                </span>
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold">
                  {data.length} kỳ thủ
                </Badge>
              </div>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {data.map((player, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-indigo-500/30 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 group"
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl font-bold overflow-hidden group-hover:scale-110 transition-transform">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={player.img || "/placeholder.svg"}
                      alt={player.name}
                    />
                  </div>
                  <CardTitle className="text-sm sm:text-lg">
                    {player.name}
                  </CardTitle>
                  <Badge
                    className={`text-xs ${
                      player.badge === "World Champion"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                        : player.badge === "Speed Master"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                        : player.badge === "Challenger"
                        ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                        : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    }`}
                  >
                    {(player.badge === "World Champion" ||
                      player.badge === "Legendary") && (
                      <Crown className="w-3 h-3 mr-1" />
                    )}
                    {player.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center text-xs sm:text-sm">
                  <p className="text-indigo-300 font-semibold">
                    ELO: {player.elo}
                  </p>
                  <p className="text-white/70">{player.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={videoSectionRef}
        className="py-12 sm:py-20 px-4 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Video giới thiệu
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Khám phá sự hấp dẫn của giải đấu cờ vua Chess NCC Vinh
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/25 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border border-indigo-500/30">
            <div className="aspect-video w-full">
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/r6zIGXun57U?si=QxkoXk6nhLVOJMe1&autoplay=0&mute=0&controls=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="tournament" className="py-12 sm:py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Thông tin giải đấu
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Giải đấu cờ vua chuyên nghiệp với sự tham gia của các cao thủ từ
              khắp nơi trên thế giới
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {[
              {
                icon: Calendar,
                title: "Thời gian",
                value: "20-31/7",
                subtitle: "2025",
              },
              {
                icon: MapPin,
                title: "Địa điểm",
                value: "Phòng Boxing Bến Thượng Hải",
                subtitle: "VP Vinh",
              },
              {
                icon: Users,
                title: "Số lượng lên đến",
                value: "256",
                subtitle: "Kỳ thủ",
              },
              {
                icon: Trophy,
                title: "Giải thưởng",
                value: "$1M",
                subtitle: "Tổng giải thưởng",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-indigo-500/30 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25"
              >
                <CardHeader className="text-center">
                  <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-indigo-400" />
                  <CardTitle className="text-sm sm:text-base">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {item.value}
                  </p>
                  <p className="text-white/80 text-sm">{item.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="schedule"
        className="py-12 sm:py-20 px-4 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Lịch thi đấu
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                date: "20/07/2025",
                title: "Ngày 1",
                badge: "Vòng loại",
                events: [
                  "09:00 - 12:00: Vòng loại bảng A-D",
                  "14:00 - 17:00: Vòng loại bảng E-H",
                  "19:00 - 20:00: Lễ khai mạc",
                ],
              },
              {
                date: "21/07/2025",
                title: "Ngày 2",
                badge: "Vòng knock-out",
                events: [
                  "09:00 - 12:00: Vòng 1/8",
                  "14:00 - 17:00: Tứ kết",
                  "19:00 - 21:00: Bán kết",
                ],
              },
              {
                date: "22/07/2025",
                title: "Ngày 3",
                badge: "Chung kết",
                events: [
                  "15:00 - 18:00: Trận chung kết",
                  "19:00 - 20:30: Lễ trao giải",
                ],
                isFinale: true,
              },
            ].map((day, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-indigo-500/30 text-white transform hover:scale-[1.02] transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                      {day.title} - {day.date}
                    </CardTitle>
                    <Badge
                      className={`${
                        day.isFinale
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                          : index === 1
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      } border-0 text-xs`}
                    >
                      {day.isFinale && <Crown className="w-3 h-3 mr-1" />}
                      {day.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {day.events.map((event, eventIndex) => (
                      <p key={eventIndex} className="text-sm sm:text-base">
                        <strong>{event.split(":")[0]}:</strong>{" "}
                        {event.split(":").slice(1).join(":")}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="prizes" className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Giải thưởng
            </h2>
            <p className="text-lg sm:text-xl text-white/80">
              Tổng giải thưởng lên đến 1,000,000 USD
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Vô địch",
                prize: "$500,000",
                desc: "+ Cúp vàng + Danh hiệu Grandmaster",
                gradient: "from-yellow-400 to-orange-500",
                icon: Trophy,
                iconColor: "text-yellow-500",
              },
              {
                title: "Á quân",
                prize: "$250,000",
                desc: "+ Cúp bạc + Chứng nhận",
                gradient: "from-gray-300 to-gray-500",
                icon: Star,
                iconColor: "text-gray-500",
              },
              {
                title: "Hạng 3",
                prize: "$150,000",
                desc: "+ Cúp đồng + Chứng nhận",
                gradient: "from-amber-600 to-amber-800",
                icon: Star,
                iconColor: "text-amber-600",
              },
            ].map((prize, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${prize.gradient} ${
                  index === 0
                    ? "text-black"
                    : index === 1
                    ? "text-black"
                    : "text-white"
                } transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <prize.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 ${prize.iconColor}`}
                    />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">
                    {prize.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl sm:text-4xl font-bold mb-2">
                    {prize.prize}
                  </p>
                  <p className="text-sm sm:text-base">{prize.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-indigo-500/30 text-white inline-block">
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-lg">
                  <strong>Giải thưởng khuyến khích:</strong> Top 4-8 mỗi người
                  nhận $25,000
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="register"
        className="py-12 sm:py-20 px-4 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Đăng ký tham gia
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8">
            Đừng bỏ lỡ cơ hội tham gia giải đấu cờ vua lớn nhất tháng!
          </p>

          <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-indigo-500/30 text-white">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    Điều kiện tham gia:
                  </h3>
                  <ul className="text-left space-y-2 text-white/90 text-sm sm:text-base">
                    <li>• ELO tối thiểu: 400</li>
                    <li>• Lệ phí đăng ký: $50,000</li>
                    <li>• Hạn đăng ký: 19/07/2025</li>
                    <li>• Giới hạn: 256 kỳ thủ</li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-indigo-500/30">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg shadow-indigo-500/25 border-0 w-full sm:w-auto"
                    onClick={() => {
                      alert("Vui lòng chờ đến ngày 19/7/2025");
                    }}
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Đăng ký ngay
                  </Button>
                  <p className="text-xs sm:text-sm text-white/60 mt-4">
                    Còn lại nhiều suất đăng ký
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-indigo-500/20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ChessLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-white font-bold text-sm sm:text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center md:text-left">
                Chess NCC Vinh Tournament 2025
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white/60 text-sm">
              <Link
                href="#"
                className="hover:text-indigo-300 transition-colors"
              >
                Liên hệ
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-300 transition-colors"
              >
                Điều khoản
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-300 transition-colors"
              >
                Quyền riêng tư
              </Link>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-indigo-500/20 text-center text-white/60 text-sm">
            <p>
              &copy; 2025 Chess NCC Vinh Tournament. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
