import React, { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

const STYLE_ID = "animated-theme-toggler-styles"
const SMOOTH_EASE = "cubic-bezier(0.25, 1, 0.5, 1)"

function polygonCollapsed(point, vertexCount) {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ")
  return `polygon(${pairs})`
}

// Coordinate percentage mapper for clip-path shapes
function getThemeTransitionClipPaths(
  variant,
  cx,
  cy,
  maxRadius,
  viewportWidth,
  viewportHeight
) {
  const toX = (x) => `${(x / viewportWidth) * 100}%`
  const toY = (y) => `${(y / viewportHeight) * 100}%`
  const point = (x, y) => `${toX(x)} ${toY(y)}`
  const toRadius = (r) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`

  switch (variant) {
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const halfSide = Math.max(halfW, halfH) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "triangle": {
      const scale = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * scale
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`]
    }
    case "diamond": {
      const R = maxRadius * Math.SQRT2
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2
      const verts = []
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)))
      }
      return [polygonCollapsed(point(cx, cy), 6), `polygon(${verts.join(", ")})`]
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "star": {
      const R = maxRadius * Math.SQRT2 * 1.03
      const innerRatio = 0.42
      const starPolygon = (radius) => {
        const verts = []
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5
          verts.push(point(cx + radius * Math.cos(outerA), cy + radius * Math.sin(outerA)))
          const innerA = outerA + Math.PI / 5
          verts.push(
            point(cx + radius * innerRatio * Math.cos(innerA), cy + radius * innerRatio * Math.sin(innerA))
          )
        }
        return `polygon(${verts.join(", ")})`
      }
      const startR = Math.max(2, R * 0.025)
      return [starPolygon(startR), starPolygon(R)]
    }
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ]
  }
}

export const AnimatedThemeToggler = ({
  className = "",
  duration = 1400,
  blur = 90,
  variant = "circle",
  fromCenter = false,
  theme,
  onThemeChange,
  children,
  ...props
}) => {
  const isControlled = theme !== undefined
  const [internalIsDark, setInternalIsDark] = useState(false)
  const isDark = isControlled ? theme === "dark" : internalIsDark
  const buttonRef = useRef(null)
  const isTransitioningRef = useRef(false)
  const activeAnimRef = useRef(null)

  const removeStyles = useCallback(() => {
    const el = document.getElementById(STYLE_ID)
    if (el) el.remove()
  }, [])

  const cancelAnim = useCallback(() => {
    if (activeAnimRef.current) {
      activeAnimRef.current.cancel()
      activeAnimRef.current = null
    }
    removeStyles()
  }, [removeStyles])

  useEffect(() => {
    return () => {
      cancelAnim()
      const root = document.documentElement
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty("--magicui-theme-toggle-vt-duration")
      root.style.removeProperty("--magicui-theme-vt-clip-from")
      root.style.removeProperty("--mask-size")
    }
  }, [cancelAnim])

  useEffect(() => {
    if (isControlled) return

    const updateTheme = () => {
      setInternalIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [isControlled])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (
      !button ||
      isTransitioningRef.current ||
      document.documentElement.dataset.magicuiThemeVt === "active"
    ) {
      return
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let x
    let y
    if (fromCenter) {
      x = viewportWidth / 2
      y = viewportHeight / 2
    } else {
      const rect = button.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      const newTheme = !isDark
      document.documentElement.classList.toggle("dark", newTheme)
      if (isControlled) {
        onThemeChange?.(newTheme ? "dark" : "light")
      } else {
        setInternalIsDark(newTheme)
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      }
    }

    if (typeof document.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const isCircleVariant = variant === "circle" || variant === "circle-blur"
    const root = document.documentElement
    root.dataset.magicuiThemeVt = "active"

    const cleanup = () => {
      isTransitioningRef.current = false
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty("--magicui-theme-toggle-vt-duration")
      root.style.removeProperty("--magicui-theme-vt-clip-from")
      root.style.removeProperty("--mask-size")
      removeStyles()
      cancelAnim()
    }

    isTransitioningRef.current = true

    if (isCircleVariant) {
      // -------------------------------------------------------------
      // Smooth Blurred Radial Mask Circle Animation
      // -------------------------------------------------------------
      const xPercent = ((x / viewportWidth) * 100).toFixed(3)
      const yPercent = ((y / viewportHeight) * 100).toFixed(3)
      const endRadius = Math.ceil(maxRadius + blur + 60)
      const blurAmount = Math.max(20, blur)

      let styleEl = document.getElementById(STYLE_ID)
      if (!styleEl) {
        styleEl = document.createElement("style")
        styleEl.id = STYLE_ID
        document.head.appendChild(styleEl)
      }

      styleEl.textContent = `
        @property --mask-size {
          syntax: '<length-percentage>';
          inherits: true;
          initial-value: 0px;
        }
        ::view-transition-old(root) {
          animation: none;
          mix-blend-mode: normal;
          z-index: 1;
        }
        ::view-transition-new(root) {
          mix-blend-mode: normal;
          z-index: 9999;
          -webkit-mask-image: radial-gradient(
            circle at ${xPercent}% ${yPercent}%,
            #000 0%,
            #000 calc(max(0px, var(--mask-size) - ${blurAmount}px)),
            rgba(0, 0, 0, 0.5) calc(max(0px, var(--mask-size) - ${Math.round(blurAmount * 0.35)}px)),
            transparent var(--mask-size)
          );
          mask-image: radial-gradient(
            circle at ${xPercent}% ${yPercent}%,
            #000 0%,
            #000 calc(max(0px, var(--mask-size) - ${blurAmount}px)),
            rgba(0, 0, 0, 0.5) calc(max(0px, var(--mask-size) - ${Math.round(blurAmount * 0.35)}px)),
            transparent var(--mask-size)
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          animation: theme-smooth-circle-blur ${duration}ms ${SMOOTH_EASE} forwards;
        }
        @keyframes theme-smooth-circle-blur {
          from {
            --mask-size: 0px;
          }
          to {
            --mask-size: ${endRadius}px;
          }
        }
      `

      const transition = document.startViewTransition(() => {
        flushSync(applyTheme)
      })

      if (typeof transition?.finished?.finally === "function") {
        transition.finished.finally(cleanup).catch(() => {})
      } else {
        cleanup()
      }

      const ready = transition?.ready
      if (ready && typeof ready.then === "function") {
        ready
          .then(() => {
            // Also animate registered CSS property via Web Animations API for maximum frame consistency
            if (root.animate) {
              const anim = root.animate(
                [
                  { "--mask-size": "0px" },
                  { "--mask-size": `${endRadius}px` },
                ],
                {
                  duration,
                  easing: SMOOTH_EASE,
                  fill: "forwards",
                }
              )
              activeAnimRef.current = anim
            }
          })
          .catch(() => {})
      }
    } else {
      // -------------------------------------------------------------
      // Geometric Clip-path Animation (polygons, star, etc.)
      // -------------------------------------------------------------
      const clipPath = getThemeTransitionClipPaths(
        variant,
        x,
        y,
        maxRadius,
        viewportWidth,
        viewportHeight
      )

      root.style.setProperty("--magicui-theme-toggle-vt-duration", `${duration}ms`)
      root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0])

      const transition = document.startViewTransition(() => {
        flushSync(applyTheme)
      })

      if (typeof transition?.finished?.finally === "function") {
        transition.finished.finally(cleanup).catch(() => {})
      } else {
        cleanup()
      }

      const ready = transition?.ready
      if (ready && typeof ready.then === "function") {
        ready
          .then(() => {
            const anim = document.documentElement.animate(
              { clipPath },
              {
                duration,
                easing: variant === "star" ? "linear" : SMOOTH_EASE,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
              }
            )
            activeAnimRef.current = anim
          })
          .catch(() => {})
      }
    }
  }, [
    variant,
    fromCenter,
    duration,
    blur,
    isDark,
    isControlled,
    onThemeChange,
    cancelAnim,
    removeStyles,
  ])

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={className}
      {...props}
    >
      {children ? (
        children
      ) : (
        <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
          <Sun
            size={16}
            className={`transition-all duration-700 ease-out transform ${
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            size={16}
            className={`absolute transition-all duration-700 ease-out transform ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default AnimatedThemeToggler
