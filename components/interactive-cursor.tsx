"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
  elementType: string
}

export function InteractiveCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    elementType: "default",
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }))
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setCursor((prev) => ({ ...prev, isClicking: true }))
    }

    const handleMouseUp = () => {
      setCursor((prev) => ({ ...prev, isClicking: false }))
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.matches("button, a, input, textarea, [role='button'], .cursor-pointer")
      const elementType = target.tagName.toLowerCase()

      setCursor((prev) => ({
        ...prev,
        isHovering: isInteractive,
        elementType: isInteractive ? elementType : "default",
      }))
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setCursor((prev) => ({ ...prev, isHovering: false, elementType: "default" }))
    }

    // Hide on touch devices
    const handleTouchStart = () => {
      setIsVisible(false)
    }

    // Add event listeners
    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchstart", handleTouchStart)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchstart", handleTouchStart)
    }
  }, [])

  if (!isVisible) return null

  const glowIntensity = cursor.isHovering ? 0.3 : 0.15
  const glowSize = cursor.isHovering ? 400 : 300
  const coreSize = cursor.isClicking ? 30 : cursor.isHovering ? 60 : 50

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: cursor.x - glowSize / 2,
          y: cursor.y - glowSize / 2,
          scale: cursor.isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: cursor.isHovering ? 600 : 400,
          damping: cursor.isHovering ? 30 : 25,
          mass: 0.5,
        }}
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: `radial-gradient(circle, rgba(0, 212, 170, ${glowIntensity}) 0%, rgba(0, 212, 170, ${
            glowIntensity * 0.5
          }) 30%, rgba(0, 212, 170, ${glowIntensity * 0.1}) 60%, transparent 100%)`,
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
      />

      {/* Secondary glow with different color on hover */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: cursor.x - 100,
          y: cursor.y - 100,
          scale: cursor.isClicking ? 0.6 : cursor.isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: cursor.isHovering ? 800 : 600,
          damping: 35,
          mass: 0.3,
        }}
        style={{
          width: "200px",
          height: "200px",
          background: cursor.isHovering
            ? "radial-gradient(circle, rgba(0, 255, 204, 0.2) 0%, rgba(0, 212, 170, 0.1) 50%, transparent 80%)"
            : "radial-gradient(circle, rgba(0, 212, 170, 0.2) 0%, rgba(0, 212, 170, 0.1) 50%, transparent 80%)",
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />

      {/* Core bright spot */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: cursor.x - coreSize / 2,
          y: cursor.y - coreSize / 2,
          scale: cursor.isClicking ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
          mass: 0.1,
        }}
        style={{
          width: `${coreSize}px`,
          height: `${coreSize}px`,
          background: cursor.isHovering
            ? "radial-gradient(circle, rgba(0, 255, 204, 0.6) 0%, rgba(0, 212, 170, 0.3) 50%, transparent 80%)"
            : "radial-gradient(circle, rgba(0, 212, 170, 0.4) 0%, rgba(0, 212, 170, 0.2) 50%, transparent 80%)",
          borderRadius: "50%",
        }}
      />

      {/* Sparkle effect on click */}
      {cursor.isClicking && (
        <motion.div
          className="fixed pointer-events-none z-50"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            x: cursor.x - 30,
            y: cursor.y - 30,
            width: "60px",
            height: "60px",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  )
}
