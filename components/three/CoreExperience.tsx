'use client';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView, useReducedMotion, useScroll } from 'framer-motion';
import { site } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import type { CoreMode } from './CoreScene';

const Scene = dynamic(() => import('./CoreScene'), { ssr: false });
class SceneBoundary extends Component<{children:ReactNode;onFailure:()=>void},{failed:boolean}> {
    state = {failed:false};
    static getDerivedStateFromError() { return {failed:true}; }
    componentDidCatch() { this.props.onFailure(); }
    render() { return this.state.failed ? null : this.props.children; }
}

export function CoreExperience() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {margin:'80px'});
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const [supported, setSupported] = useState<boolean | null>(null);
    const [visible, setVisible] = useState(true);
    const [mode, setMode] = useState<CoreMode>('structure');
    const [paused, setPaused] = useState(false);
    const [ready, setReady] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [depth, setDepth] = useState(75);
    const [turn, setTurn] = useState(0);
    useEffect(() => {
        // Detect unavailable GPU support before React Three Fiber starts its renderer.
        try {
            const probe = document.createElement('canvas');
            const context = probe.getContext('webgl2');
            setSupported(Boolean(context));
            context?.getExtension('WEBGL_lose_context')?.loseContext();
        } catch { setSupported(false); }
        const update = () => setVisible(!document.hidden);
        document.addEventListener('visibilitychange', update);
        return () => document.removeEventListener('visibilitychange', update);
    }, []);
    const onReady = useCallback(() => setReady(true), []);
    const onFailure = useCallback(() => {setSupported(false); setReady(false);}, []);
    const showScene = supported === true && enabled;
    const fallback = !ready || !showScene;
    const reset = () => {setDepth(75);setTurn(0);setMode('structure');};
    return (
        <figure ref={ref} className="core-stage" data-mode={mode} data-depth={depth} data-renderer={!fallback ? 'webgl':'static'} aria-labelledby="core-title" aria-describedby="core-caption">
            <h2 id="core-title" className="sr-only">Interactive system visualization</h2>
            <div className="core-viewport">
                <div className={'core-fallback '+(!fallback ? 'is-hidden':'')} style={{transform:'rotate('+turn*15+'deg) scaleY('+(0.7+depth/333)+')'}} role="img" aria-hidden={!fallback} aria-label="Interconnected structural loops representing interface, logic and data" />
                {showScene && <SceneBoundary onFailure={onFailure}><Scene accent={site.accent} mode={mode} paused={paused} reduced={Boolean(reduced)} active={inView && visible} depth={depth/100} turn={turn} scrollProgress={scrollYProgress} onReady={onReady} onFailure={onFailure}/></SceneBoundary>}
            </div>
            <div className="core-console">
                <div className="core-toolbar">
                    <div className="core-modes" role="group" aria-label="Core visualization mode">{(['structure','network'] as const).map(item=><button key={item} aria-pressed={mode===item} onClick={()=>setMode(item)}>{item === 'structure' ? 'Structure' : 'Network'}</button>)}</div>
                    <button className="motion-button" onClick={()=>setPaused(!paused)} disabled={Boolean(reduced) || fallback} aria-label={paused?'Resume idle rotation':'Pause idle rotation'} aria-pressed={paused || Boolean(reduced)}><Icon name={paused || reduced?'play':'pause'}/></button>
                    {supported !== false && <button className="view-toggle" onClick={()=>{setEnabled(!enabled);setReady(false);}} aria-pressed={enabled} aria-label={enabled ? 'Switch to 2D study' : 'Switch to 3D study'}>{enabled?'2D view':'3D view'}</button>}
                </div>
                <div className="core-depth"><label htmlFor="core-depth">Depth</label><input id="core-depth" type="range" min="0" max="100" value={depth} onChange={event=>setDepth(Number(event.target.value))} aria-valuetext={depth+' percent spatial depth'}/><output htmlFor="core-depth">{String(depth).padStart(3,'0')}</output><button onClick={()=>setTurn(turn-1)} aria-label="Rotate core left">←</button><button onClick={()=>setTurn(turn+1)} aria-label="Rotate core right">→</button><button className="core-reset" onClick={reset}>Reset</button></div>
            </div>
            <figcaption id="core-caption" className="core-caption" aria-live="polite">{mode==='structure'?'A living system between interface, logic, and data.':'The same system, seen as a network.'}<span>{supported===false?'WebGL unavailable · static study':reduced?'Reduced motion':paused?'Idle rotation paused':enabled?'Hover and controls active':'Static study'}</span></figcaption>
        </figure>
    );
}
