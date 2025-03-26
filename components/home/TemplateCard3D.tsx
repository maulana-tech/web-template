'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh } from 'three';

interface TemplateCard3DProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  templateId: string;
}

export default function TemplateCard3D({ position, rotation, scale, templateId }: TemplateCard3DProps) {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load texture based on template ID
  const texture = useTexture(`/templates/${templateId}-preview.jpg`);
  
  // Animate on hover and continuously
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Subtle floating animation
    mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    
    // Hover effect
    if (hovered) {
      mesh.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[2, 3, 1]} />
      <meshStandardMaterial 
        map={texture} 
        emissive={hovered ? [0.1, 0.1, 0.2] : [0, 0, 0]}
        emissiveIntensity={hovered ? 1 : 0}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
}