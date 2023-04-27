import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({product}) {
  const {id, image, title, category, price} = product
  const navigate = useNavigate()
  return (
    <li onClick={() => navigate(`/products/${id}`, {state: {product:product}})} className='rounded-lg shadow-lg cursor-pointer'>
      <img className='w-full' src={image}/>
      <div className='mt-2 px-2 text-lg  justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`$ ${price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{category}</p>
    </li>
  )
}
