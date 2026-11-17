'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, OrbitControls, useGLTF } from '@react-three/drei'

function ShoeModel() {
  const { scene } = useGLTF('/models/lev-shoes.glb')

  return <primitive object={scene} />
}

export default function Shoe3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [4, 3, 5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.4} />

        <directionalLight position={[4, 5, 5]} intensity={2.2} />

        <directionalLight position={[-4, 2, -3]} intensity={0.8} />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <ShoeModel />
          </Bounds>
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.7}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  )
}
