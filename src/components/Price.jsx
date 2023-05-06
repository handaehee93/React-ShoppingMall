import React from 'react'

export default function Price({text, price}) {
  return (
    <div className='bg-gray-100 text-center text-lg md:text-xl'>
      <p>{text}</p>
      <p className='font-bold text-logo text-xl'>${price}</p>
    </div>
  )
}
