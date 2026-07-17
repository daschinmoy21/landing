import React from 'react'

export default function SpecularButton({ children, href = '#early-access', className = '' }) {
  return (
    <a href={href} className={`specular-button ${className}`}>
      <span className="specular-button__glow" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </a>
  )
}
