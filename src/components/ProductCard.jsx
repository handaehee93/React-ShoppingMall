import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({product}) {
  const {id, image, title, price} = product
  const navigate = useNavigate()
  return (
    <li onClick={() => navigate(`/products/${id}`, {state: {product:product}})} className='rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105 '>
      <img className='w-full' src={image}/>
      <div className='mt-2 px-2 text-lg  justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`$ ${price}`}</p>
      </div>
    </li>
  )
}

