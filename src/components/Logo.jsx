import React from 'react'
function Logo({width='100px', img}) {
  return (
    <img src={img} className='size-12' alt='Logo'/>
  )
}

export default Logo