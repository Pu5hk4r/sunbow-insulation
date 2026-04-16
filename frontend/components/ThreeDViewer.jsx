"use client";
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function FallbackMesh({ color, isYarn }) {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} castShadow>
                <cylinderGeometry args={isYarn ? [1.2, 1.2, 2.5, 64] : [1, 1, 3, 64, 32, true]} />
                <meshPhysicalMaterial color={color} roughness={isYarn ? 0.9 : 0.4} metalness={0.1} clearcoat={isYarn ? 0 : 0.8} clearcoatRoughness={0.2} wireframe={isYarn} side={THREE.DoubleSide} />
            </mesh>
            {!isYarn && (
                <mesh renderOrder={-1}>
                    <cylinderGeometry args={[0.95, 0.95, 3.01, 64, 1, true]} />
                    <meshBasicMaterial color="#111" side={THREE.BackSide} />
                </mesh>
            )}
        </Float>
    );
}

function TexturedMaterial({ imageUrl, isYarn }) {
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 1);
    return (
        <meshPhysicalMaterial 
            color="#FFF"
            map={texture}
            roughness={isYarn ? 0.9 : 0.2}
            metalness={-0.1}
            clearcoat={isYarn ? 0 : 0.6}
            clearcoatRoughness={0.3}
            side={THREE.DoubleSide}
        />
    );
}

function SolidMaterial({ color, isYarn }) {
    return (
        <meshPhysicalMaterial 
            color={color}
            roughness={isYarn ? 0.9 : 0.4}
            metalness={0.1}
            clearcoat={isYarn ? 0 : 0.8}
            clearcoatRoughness={0.2}
            wireframe={isYarn}
            side={THREE.DoubleSide}
        />
    );
}

function SleeveMesh({ color, productCategory, imageUrl }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const isYarn = productCategory === "FIBERGLASS_YARN";
    const hasTexture = imageUrl && imageUrl.startsWith('/');
    
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} castShadow>
                <cylinderGeometry args={isYarn ? [1.2, 1.2, 2.5, 64] : [1, 1, 3, 64, 32, true]} />
                {hasTexture ? <TexturedMaterial imageUrl={imageUrl} isYarn={isYarn} /> : <SolidMaterial color={color} isYarn={isYarn} />}
            </mesh>
            
            {/* Inner material for non-yarn hollow tubes */}
            {!isYarn && (
                <mesh ref={meshRef} renderOrder={-1}>
                    <cylinderGeometry args={[0.95, 0.95, 3.01, 64, 1, true]} />
                    <meshBasicMaterial color="#111" side={THREE.BackSide} />
                </mesh>
            )}
        </Float>
    );
}

export default function ThreeDViewer({ product }) {
    const c = product.color || "#FF5C1A";

    return (
        <div style={{
            width: "100%", height: "340px", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            background: `radial-gradient(ellipse at center, ${c}11 0%, transparent 70%)`,
            border: `1px solid ${c}22`,
            userSelect: "none",
        }}>
            <Canvas camera={{ position: [0, 1.5, 4.5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.15} penumbra={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color={c} />
                
                <Suspense fallback={<FallbackMesh color={c} isYarn={product.cat === "FIBERGLASS_YARN"} />}>
                    <SleeveMesh color={c} productCategory={product.cat} imageUrl={product.img} />
                </Suspense>

                <Environment preset="city" />
                <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color={c} />
                <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
            </Canvas>

            {/* Label */}
            <div style={{
                position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "3px",
                color: "var(--muted)", pointerEvents: "none"
            }}>
                DRAG TO ROTATE · SCROLL TO ZOOM
            </div>
        </div>
    );
}
