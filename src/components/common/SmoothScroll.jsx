import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * SmoothScroll component powered by Lenis.
 * Provides high-performance, fluid inertia scrolling across the hospital dashboard.
 */
export const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Instantiate Lenis with natural momentum and gesture support
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.05,
            touchMultiplier: 1.5,
            autoRaf: true,
            anchors: true,
            overscroll: true,
            respectReducedMotion: true,
            prevent: (node) => !!(node?.closest?.('[data-lenis-prevent]') || node?.closest?.('aside') || node?.closest?.('nav')),
        });

        lenisRef.current = lenis;

        // Make lenis globally accessible if needed for scrollTo
        if (typeof window !== 'undefined') {
            window.lenis = lenis;
        }

        return () => {
            lenis.destroy();
            lenisRef.current = null;
            if (typeof window !== 'undefined' && window.lenis === lenis) {
                delete window.lenis;
            }
        };
    }, []);

    // Instant top reset on route transitions
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return children;
};

export default SmoothScroll;
