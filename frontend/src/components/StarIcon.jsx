import React, { useEffect, useRef, useState } from "react"
const StarIcon = ({ filled, ...props }) => {
  const [animate, setAnimate] = useState(false)
  const prevFilled = useRef(filled)

  useEffect(() => {
    if (!prevFilled.current && filled) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 500)
    }
    prevFilled.current = filled
  }, [filled])

  return (
    <img
      {...props}
      src={filled ? "/star-fill.svg" : "/star-line.svg"}
      alt={filled ? "Filled star" : "Empty star"}
      className={`w-6 h-6 cursor-pointer${animate ? " star-grow" : ""}`}
    />
  )
}
export default StarIcon
