import { useState, useEffect } from 'react'

import headImg from '../assets/personaje/frame1.png'
import leftLegImg from '../assets/personaje/frame2.png'
import rightLegImg from '../assets/personaje/frame3.png'
import swordImg from '../assets/personaje/frame4.png'
import bodyImg from '../assets/personaje/frame5.png'
import shieldImg from '../assets/personaje/frame7.png'

function Personaje({ equipo, apariencia, nivel = 1, tamanho = 'normal' }) {
  const tamanoPixel = tamanho === 'grande' ? 200 : tamanho === 'chico' ? 80 : 120

  const partStyle = (top, left, width, zIndex) => ({
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    width: `${width}%`,
    height: 'auto',
    objectFit: 'contain',
    imageRendering: 'pixelated',
    zIndex: zIndex
  })

  return (
    <div 
      style={{ 
        width: tamanoPixel, 
        height: tamanoPixel, 
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {/* Piernas (atrás) */}
      <img src={leftLegImg} alt="Pierna Izquierda" style={partStyle(75, 33, 15, 1)} />
      <img src={rightLegImg} alt="Pierna Derecha" style={partStyle(75, 52, 15, 1)} />
      
      {/* Brazo Izquierdo / Escudo (izquierda) */}
      <img src={shieldImg} alt="Escudo" style={partStyle(40, 5, 28, 5)} />
      
      {/* Cuerpo */}
      <img src={bodyImg} alt="Cuerpo" style={partStyle(45, 30, 40, 3)} />
      
      {/* Cabeza (frente, arriba) */}
      <img src={headImg} alt="Cabeza" style={partStyle(18, 25, 50, 4)} />
      
      {/* Brazo Derecho / Espada (derecha) */}
      <img src={swordImg} alt="Espada" style={partStyle(20, 60, 35, 2)} />
    </div>
  )
}

export default Personaje