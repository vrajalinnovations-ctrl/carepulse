import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { flushSync } from "react-dom"

const EXPO_OUT = "cubic-bezier(0.25, 0.8, 0.25, 1)"

const ThemeContext = createContext(undefined)

const DEFAULT_PRIMARY = "#22c55e"

const hexToRgb = (hex) => {
  const clean = hex.replace("#", "")
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean
  const num = parseInt(full, 16)
  return `${(num >> 16) & 255} ${(num >> 8) & 255} ${num & 255}`
}

const primaryShadeMix = {
  50: ["#ffffff", 0.95],
  100: ["#ffffff", 0.9],
  200: ["#ffffff", 0.75],
  300: ["#ffffff", 0.6],
  400: ["#ffffff", 0.3],
  500: ["#000000", 0],
  600: ["#000000", 0.12],
  700: ["#000000", 0.25],
  800: ["#000000", 0.4],
  900: ["#000000", 0.6],
  950: ["#000000", 0.75],
}

const mixHex = (color, mixColor, amount) => {
  const [red, green, blue] = hexToRgb(color).split(" ").map(Number)
  const [mixRed, mixGreen, mixBlue] = hexToRgb(mixColor).split(" ").map(Number)
  const channel = (value, target) => Math.round(value + (target - value) * amount)
  return `rgb(${channel(red, mixRed)} ${channel(green, mixGreen)} ${channel(blue, mixBlue)})`
}

const applyPrimaryColor = (color) => {
  const root = document.documentElement
  root.style.setProperty("--primary-color", color)
  root.style.setProperty("--primary-rgb", hexToRgb(color))

  Object.entries(primaryShadeMix).forEach(([shade, [mixColor, amount]]) => {
    root.style.setProperty(`--primary-${shade}`, mixHex(color, mixColor, amount))
  })
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("theme") : null) || "dark")
  const [direction, setDirection] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("direction") : null) || "ltr")
  const [primaryColor, setPrimaryColor] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("primaryColor") : null) || DEFAULT_PRIMARY)
  const [navbarPosition, setNavbarPosition] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("navbarPosition") : null) || "sticky")
  const [mounted, setMounted] = useState(false)
  const [lastStart, setLastStart] = useState("top-right") 
  const [isCenterOut, setIsCenterOut] = useState(true)
  const styleId = "theme-transition-styles"

  // ---- animation helpers ----
  const getPositionCoords = (position) => {
    switch (position) {
      case "top-left": return { cx: "0", cy: "0" }
      case "top": return { cx: "20", cy: "0" }
      case "top-right": return { cx: "40", cy: "0" }
      case "left": return { cx: "0", cy: "20" }
      case "center": return { cx: "20", cy: "20" }
      case "right": return { cx: "40", cy: "20" }
      case "bottom-left": return { cx: "0", cy: "40" }
      case "bottom": return { cx: "20", cy: "40" }
      case "bottom-right": return { cx: "40", cy: "40" }
      default: return null
    }
  }

  const generateSVG = (variant, start) => {
    if (variant === "rectangle-left" || variant === "rectangle-right") {
      return `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="0" y="0" width="100" height="100" fill="black"/></svg>')}`
    }

    if (variant === "rectangle-blur-left" || variant === "rectangle-blur-right") {
      const blurAmount = 3
      const padding = blurAmount * 3
      const viewBoxMin = -padding
      const viewBoxSize = 100 + padding * 2

      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxMin} ${viewBoxMin} ${viewBoxSize} ${viewBoxSize}" preserveAspectRatio="none"><defs><filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${blurAmount}"/></filter></defs><rect x="0" y="0" width="100" height="100" fill="black" filter="url(#blur)"/></svg>`)}`
    }

    const actualStart = (variant === "circle-center" || variant === "circle-blur-center") ? "center" : start
    const pos = getPositionCoords(actualStart) || { cx: "20", cy: "20" }
    const { cx, cy } = pos

    if (variant === "circle" || variant === "circle-center") {
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet"><circle cx="${cx}" cy="${cy}" r="20" fill="black"/></svg>`)}`
    }

    if (variant === "circle-blur" || variant === "circle-blur-center") {
      const blurAmount = 1.5
      const padding = blurAmount * 3
      const viewBoxMin = -padding
      const viewBoxSize = 40 + padding * 2

      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxMin} ${viewBoxMin} ${viewBoxSize} ${viewBoxSize}" preserveAspectRatio="xMidYMid meet"><defs><filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${blurAmount}"/></filter></defs><circle cx="${cx}" cy="${cy}" r="19" fill="black" filter="url(#blur)"/></svg>`)}`
    }

    return ""
  }

  const getTransformOrigin = (start) => {
    switch (start) {
      case "top-left": return "top left"
      case "top": return "top"
      case "top-right": return "top right"
      case "left": return "left"
      case "center": return "center"
      case "right": return "right"
      case "bottom-left": return "bottom left"
      case "bottom": return "bottom"
      case "bottom-right": return "bottom right"
      default: return "center"
    }
  }

  const createAnimation = (variant, start, animDir = "out") => {
    const actualStart = (variant === "circle-center" || variant === "circle-blur-center") ? "center" : start
    const svg = generateSVG(variant, actualStart)

    if (variant === "rectangle-left" || variant === "rectangle-blur-left") {
      return {
        name: `${variant}-slide`,
        css: `
          ::view-transition-group(root) {
            animation-timing-function: linear;
          }
          ::view-transition-new(root) {
            mask: url('${svg}') left top / 0 100% no-repeat;
            -webkit-mask: url('${svg}') left top / 0 100% no-repeat;
            animation: slide-left-right 0.6s linear both;
          }
          ::view-transition-old(root),
          .dark::view-transition-old(root) {
            animation: fade-out 0.6s linear both;
            z-index: -1;
          }
          @keyframes slide-left-right {
            0% {
              mask-size: 0 100%;
              -webkit-mask-size: 0 100%;
            }
            100% {
              mask-size: 100% 100%;
              -webkit-mask-size: 100% 100%;
            }
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
        `,
      }
    }

    if (variant === "rectangle-right" || variant === "rectangle-blur-right") {
      return {
        name: `${variant}-slide`,
        css: `
          ::view-transition-group(root) {
            animation-timing-function: linear;
          }
          ::view-transition-new(root) {
            mask: url('${svg}') right top / 0 100% no-repeat;
            -webkit-mask: url('${svg}') right top / 0 100% no-repeat;
            animation: slide-right-left 0.6s linear both;
          }
          ::view-transition-old(root),
          .dark::view-transition-old(root) {
            animation: fade-out 0.6s linear both;
            z-index: -1;
          }
          @keyframes slide-right-left {
            0% {
              mask-size: 0 100%;
              -webkit-mask-size: 0 100%;
            }
            100% {
              mask-size: 100% 100%;
              -webkit-mask-size: 100% 100%;
            }
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
        `,
      }
    }

    // Edges -> Center (Shrink to Center)
    if (actualStart === "center" && animDir === "in") {
      return {
        name: `${variant}-center-in`,
        css: `
          ::view-transition-group(root) {
            animation-timing-function: ${EXPO_OUT};
          }
          ::view-transition-old(root) {
            mask: url('${svg}') center / 350vmax 350vmax no-repeat;
            -webkit-mask: url('${svg}') center / 350vmax 350vmax no-repeat;
            animation: scale-center-in 1.8s ${EXPO_OUT} both;
            transform-origin: center;
            z-index: 2;
          }
          ::view-transition-new(root) {
            animation: none;
            z-index: -1;
          }
          @keyframes scale-center-in {
            from {
              mask-size: 250vmax 250vmax;
              -webkit-mask-size: 250vmax 250vmax;
            }
            to {
              mask-size: 0 0;
              -webkit-mask-size: 0 0;
            }
          }
        `,
      }
    }

    // Center -> Edges (Expand from Center) or Corner/Side positions
    const transformOrigin = getTransformOrigin(actualStart)
    const maskPos = actualStart === "center" ? "center" : (actualStart ? actualStart.replace("-", " ") : "top right")
    const keyframeName = actualStart === "center" ? "scale-center-out" : `scale-${actualStart}`
    const duration = actualStart === "center" ? "2.4s" : "1.6s" // slow down center-out expand specifically
    return {
      name: `${variant}-${actualStart}`,
      css: `
        ::view-transition-group(root) {
          animation-timing-function: ${EXPO_OUT};
        }
        ::view-transition-new(root) {
          mask: url('${svg}') ${maskPos} / 0 0 no-repeat;
          -webkit-mask: url('${svg}') ${maskPos} / 0 0 no-repeat;
          animation: ${keyframeName} ${duration} ${EXPO_OUT} both;
          transform-origin: ${transformOrigin};
          z-index: 2;
        }
        ::view-transition-old(root) {
          animation: none;
          z-index: 1;
        }
        @keyframes ${keyframeName} {
          from {
            mask-size: 0 0;
            -webkit-mask-size: 0 0;
          }
          to {
            mask-size: 350vmax 350vmax;
            -webkit-mask-size: 350vmax 350vmax;
          }
        }
      `,
    }
  }

  const updateStyles = useCallback((css) => {
    let styleElement = document.getElementById(styleId)
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }
    styleElement.textContent = css
  }, [])

  // ---- normal theme mount ----
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.setAttribute("dir", direction)
    applyPrimaryColor(primaryColor)
    setMounted(true)
  }, [theme, direction, primaryColor])

  const toggleTheme = (variant = "circle-blur", start, end) => {
    if (variant && typeof variant !== "string") {
      variant = "circle-blur"
      start = undefined
      end = undefined
    }

    const isCenterVariant = variant === "circle-center" || variant === "circle-blur-center"
    const from = isCenterVariant ? "center" : (start ?? lastStart)
    const to = end ?? (lastStart === "top-left" ? "top-right" : "top-left")
    setLastStart(to)

    const currentDir = isCenterOut ? "out" : "in"
    if (isCenterVariant || from === "center") {
      setIsCenterOut((prev) => !prev)
    }

    const animation = createAnimation(variant, from, currentDir)
    updateStyles(animation.css)

    const switchTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
      flushSync(() => setTheme(newTheme))
    }

    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    document.startViewTransition(switchTheme)
  }

  const toggleDirection = () => {
    setDirection((prev) => {
      const next = prev === "ltr" ? "rtl" : "ltr"
      localStorage.setItem("direction", next)
      document.documentElement.setAttribute("dir", next)
      return next
    })
  }

  const changePrimaryColor = (color) => {
    setPrimaryColor(color)
    localStorage.setItem("primaryColor", color)
    applyPrimaryColor(color)
  }

  const changeNavbarPosition = (pos) => {
    const next = pos === "scroll" ? "scroll" : "sticky"
    setNavbarPosition(next)
    localStorage.setItem("navbarPosition", next)
  }

  const toggleNavbarPosition = () => {
    setNavbarPosition((prev) => {
      const next = prev === "sticky" ? "scroll" : "sticky"
      localStorage.setItem("navbarPosition", next)
      return next
    })
  }

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      direction,
      toggleDirection,
      primaryColor,
      changePrimaryColor,
      navbarPosition,
      setNavbarPosition: changeNavbarPosition,
      toggleNavbarPosition,
    }}>
      <div className="min-h-screen transition-colors duration-500">{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export default ThemeContext