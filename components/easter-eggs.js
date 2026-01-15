import { useState, useEffect, useCallback } from 'react'

// Confetti burst effect
export const triggerConfetti = () => {
  const colors = ['#ec3750', '#ff8c37', '#f1c40f', '#33d6a6', '#5bc0de', '#338eda', '#a633d6']
  const confettiCount = 100
  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;'
  document.body.appendChild(container)

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const left = Math.random() * 100
    const animationDuration = 2 + Math.random() * 2
    const delay = Math.random() * 0.5

    confetti.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: -10px;
      width: 10px;
      height: 10px;
      background: ${color};
      animation: confettiFall ${animationDuration}s ease-in ${delay}s forwards;
      transform: rotate(${Math.random() * 360}deg);
    `
    container.appendChild(confetti)
  }

  // Add CSS animation
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style')
    style.id = 'confetti-style'
    style.textContent = `
      @keyframes confettiFall {
        to {
          transform: translateY(100vh) rotate(${Math.random() * 720}deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Clean up after animation
  setTimeout(() => {
    document.body.removeChild(container)
  }, 4000)
}

// Color explosion effect
export const triggerColorExplosion = (element) => {
  const colors = ['#ec3750', '#ff8c37', '#f1c40f', '#33d6a6', '#5bc0de', '#338eda', '#a633d6']
  let colorIndex = 0
  let flashCount = 0
  const maxFlashes = 10

  const interval = setInterval(() => {
    if (element) {
      element.style.backgroundColor = colors[colorIndex % colors.length]
      colorIndex++
      flashCount++

      if (flashCount >= maxFlashes) {
        clearInterval(interval)
        element.style.backgroundColor = ''
      }
    } else {
      clearInterval(interval)
    }
  }, 100)
}

// Konami code hook
export const useKonamiCode = (callback) => {
  const [keys, setKeys] = useState([])
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key]
        if (newKeys.length > konamiCode.length) {
          newKeys.shift()
        }

        // Check if konami code matches
        if (newKeys.length === konamiCode.length) {
          const matches = newKeys.every((key, i) => key === konamiCode[i])
          if (matches) {
            callback()
            return []
          }
        }

        return newKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callback])
}

// Click counter hook
export const useClickCounter = (threshold, onThresholdReached) => {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount((prev) => {
      const newCount = prev + 1
      if (newCount >= threshold) {
        onThresholdReached()
        return 0
      }
      return newCount
    })
  }, [threshold, onThresholdReached])

  return { count, handleClick, resetCount: () => setCount(0) }
}

// Rapid action detector hook
export const useRapidActionDetector = (threshold, timeWindow, onRapidAction) => {
  const [actions, setActions] = useState([])

  const recordAction = useCallback(() => {
    const now = Date.now()
    setActions((prev) => {
      const recentActions = prev.filter(time => now - time < timeWindow)
      const newActions = [...recentActions, now]

      if (newActions.length >= threshold) {
        onRapidAction()
        return []
      }

      return newActions
    })
  }, [threshold, timeWindow, onRapidAction])

  return { recordAction }
}

// Achievement toast notification
export const showAchievement = (message, duration = 3000) => {
  const toast = document.createElement('div')
  toast.textContent = message
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out, slideOutRight 0.3s ease-in ${duration - 300}ms forwards;
  `

  // Add CSS animation if not exists
  if (!document.getElementById('achievement-style')) {
    const style = document.createElement('style')
    style.id = 'achievement-style'
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  document.body.appendChild(toast)
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast)
    }
  }, duration)
}

// Matrix rain effect for Konami code
export const triggerMatrixRain = () => {
  const canvas = document.createElement('canvas')
  canvas.id = 'matrix-rain'
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;opacity:0.3;'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const columns = Math.floor(canvas.width / 20)
  const drops = Array(columns).fill(1)

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#0F0'
    ctx.font = '15px monospace'

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96)
      ctx.fillText(text, i * 20, drops[i] * 20)

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  const interval = setInterval(draw, 33)

  // Remove after 5 seconds
  setTimeout(() => {
    clearInterval(interval)
    if (document.body.contains(canvas)) {
      document.body.removeChild(canvas)
    }
  }, 5000)
}
