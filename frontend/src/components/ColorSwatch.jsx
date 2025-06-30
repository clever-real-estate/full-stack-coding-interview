import React, { useState } from "react"

const ColorSwatch = ({ color }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(color.toUpperCase()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      className="flex items-center gap-2 cursor-pointer mt-2"
      onClick={handleCopy}
    >
      <span className="text-sm text-gray-500 font-mono uppercase">
        {copied ? "Copied" : color.toUpperCase()}
      </span>
      <div
        className="w-3 h-3 border-gray-400"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  )
}

export default ColorSwatch
