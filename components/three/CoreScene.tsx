'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import * as THREE from 'three';
export type CoreMode = 'structure' | 'network';
export interface CoreSceneProps {
    accent: string;
    mode: CoreMode;
    paused: boolean;
    reduced: boolean;
    active: boolean;
    depth: number;
    turn: number;
    scrollProgress: MotionValue<number>;
    onReady: () => void;
    onFailure: () => void;
}
function System({ accent, mode, paused, reduced, active, depth, turn, scrollProgress }: CoreSceneProps) {
    const group = useRef<THREE.Group>(null);
    const layers = useRef<THREE.Group>(null);
    const target = useRef({ x: .28, y: -.3, scroll: 0 });
    const { invalidate, gl, size } = useThree();
    const geometry = useMemo(() => {
        const knot = new THREE.TorusKnotGeometry(1.18, .36, 160, 12, 2, 3);
        const wire = new THREE.WireframeGeometry(knot);
        const positions: number[] = [];
        const connections: number[] = [];
        const count = 90;
        for (let i = 0; i < count; i++) {
            const t = i / count * Math.PI * 2;
            const r = 1.6 + .33 * Math.cos(3 * t);
            positions.push(r * Math.cos(2 * t), r * Math.sin(2 * t), .6 * Math.sin(3 * t));
        }
        for (let i = 0; i < count; i++) {
            for (const step of [1, 6]) {
                const j = (i + step) % count;
                connections.push(...positions.slice(i * 3, i * 3 + 3), ...positions.slice(j * 3, j * 3 + 3));
            }
        }
        const points = new THREE.BufferGeometry();
        points.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const links = new THREE.BufferGeometry();
        links.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3));
        return { knot, wire, points, links };
    }, []);
    useEffect(() => () => Object.values(geometry).forEach(item => item.dispose()), [geometry]);
    useEffect(() => {
        invalidate();
        if (!active || paused || reduced)
            return;
        const element = gl.domElement;
        const move = (event: PointerEvent) => {
            if (event.pointerType === 'touch')
                return;
            const rect = element.getBoundingClientRect();
            target.current.x = .28 + ((event.clientY - rect.top) / rect.height - .5) * .2;
            target.current.y = -.3 + ((event.clientX - rect.left) / rect.width - .5) * .3;
            invalidate();
        };
        const reset = () => { target.current.x = .28; target.current.y = -.3; invalidate(); };
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', reset);
        const unsubscribe = scrollProgress.on('change', () => invalidate());
        return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); unsubscribe(); };
    }, [active, paused, reduced, invalidate, gl, scrollProgress]);
    useEffect(() => { invalidate(); }, [mode, reduced, depth, turn, invalidate]);
    useFrame((_, delta) => {
        if (!group.current || !layers.current || !active)
            return;
        const desiredScale = mode === 'network' ? 1.08 : 1;
        const desiredZ = desiredScale * (.15 + depth * 1.13);
        if (reduced) {
            group.current.rotation.set(.28, -.3 + turn * .26, -.2);
            layers.current.scale.set(desiredScale, desiredScale, desiredZ);
            return;
        }
        if (paused) {
            group.current.rotation.y = -.3 + turn * .26;
            layers.current.scale.set(desiredScale, desiredScale, desiredZ);
            return;
        }
        target.current.scroll = scrollProgress.get() * .18;
        const x = target.current.x + target.current.scroll;
        const y = target.current.y + turn * .26 + Math.sin(performance.now() * .0004) * .035;
        group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, x, 5, Math.min(delta, .1));
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, y, 5, Math.min(delta, .1));
        const nextScale = THREE.MathUtils.damp(layers.current.scale.x, desiredScale, 5, Math.min(delta, .1));
        layers.current.scale.set(nextScale, nextScale, THREE.MathUtils.damp(layers.current.scale.z, desiredZ, 5, Math.min(delta, .1)));
        if (Math.abs(group.current.rotation.x - x) + Math.abs(group.current.rotation.y - y) + Math.abs(layers.current.scale.x - desiredScale) + Math.abs(layers.current.scale.z - desiredZ) > .0001)
            invalidate();
    });
    const scale = size.width < 450 ? .93 : 1.04;
    return <group ref={group} rotation={[.28, -.3, -.2]} scale={scale}>
    <group ref={layers}>
      <mesh geometry={geometry.knot} visible={mode === 'structure'}><meshStandardMaterial color="#29362c" metalness={.65} roughness={.45}/></mesh>
      <lineSegments geometry={geometry.wire} visible={mode === 'structure'}><lineBasicMaterial color={accent} transparent opacity={.4}/></lineSegments>
      <lineSegments geometry={geometry.links} visible={mode === 'network'}><lineBasicMaterial color={accent} transparent opacity={.55}/></lineSegments>
      <points geometry={geometry.points}><pointsMaterial color={accent} size={.035} sizeAttenuation/></points>
    </group>
    <mesh rotation={[1.2, .1, .3]}><torusGeometry args={[2.18, .006, 4, 100]}/><meshBasicMaterial color="#586354" transparent opacity={.6}/></mesh>
    <mesh rotation={[.2, 1.3, -.3]}><torusGeometry args={[2.36, .005, 4, 100]}/><meshBasicMaterial color="#38453b"/></mesh>
    <mesh><octahedronGeometry args={[.44, 0]}/><meshStandardMaterial color={accent} metalness={.65} roughness={.3} wireframe/></mesh>
  </group>;
}
function Lifecycle({ onReady, onFailure }: Pick<CoreSceneProps, 'onReady' | 'onFailure'>) {
    const { gl } = useThree();
    useEffect(() => {
        const lost = (event: Event) => { event.preventDefault(); onFailure(); };
        gl.domElement.addEventListener('webglcontextlost', lost);
        onReady();
        return () => gl.domElement.removeEventListener('webglcontextlost', lost);
    }, [gl, onReady, onFailure]);
    return null;
}
export default function CoreScene(props: CoreSceneProps) {
    return <Canvas camera={{ position: [0, 0, 6.6], fov: 43 }} dpr={[1, 1.5]} frameloop={props.active && !props.reduced && !props.paused ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} fallback={<span className="sr-only">Static system visualization</span>}>
    <ambientLight intensity={1.5}/><directionalLight position={[2, 4, 5]} intensity={3}/><directionalLight position={[-4, -1, 2]} intensity={1.5} color={props.accent}/>
    <System {...props}/><AdaptiveDpr pixelated/><Lifecycle onReady={props.onReady} onFailure={props.onFailure}/>
  </Canvas>;
}
