"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
    const count = 5000;
    const meshRef = useRef<THREE.Points>(null);
    
    // Create random positions and scale factors
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3]     = (Math.random() - 0.5) * 30; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
        }
        return positions;
    }, [count]);

    // Slowly rotate the particle system
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#f59e0b"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

export function ParticleBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-60 mix-blend-screen bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div>
    );
}
