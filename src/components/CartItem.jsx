import React from 'react'
import { AddUpdateToCart } from '../api/firebase'
import { removeFromCart } from '../api/firebase'
import Button from './ui/Button'
import useQueryCart from '../hooks/useQueryCart'

export default function CartItem({product, user}) {
  const {id, image, title, quantity, price} = product
  const {updateCart, removeCart} = useQueryCart()
  const handlePlus = () => {
    updateCart.mutate( {...product, quantity: quantity +1})

  }
  const handleMinus = () => {
    if(quantity < 2) {
      return
    }
    updateCart.mutate({...product, quantity: quantity -1})
  }
  const handleDelete = () => {
    removeCart.mutate(id)
  }
  return (
    <li className='flex justify-between my-2 items-center'>
      <img className='w-24 md:w-48 rounded-lg' src={image} alt="이미지" />
      <div className='flex-1 ml-4 justify-between'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className=''>${price}</p>
        </div>
        <div className='text-2xl flex  gap-2 items-center'>
          <Button 
            className='cursor-pointer transition-all hover:text-logo mx-1' text='-' 
            onClick={handleMinus} 
          />
          <span>{quantity}</span>
          <Button 
            className='cursor-pointer transition-all hover:text-logo mx-1' 
            text='+' 
            onClick={handlePlus} 
          />
          <Button 
            className='cursor-pointer transition-all hover:text-logo mx-1' 
            text='삭제' 
            onClick={handleDelete} 
          />
        </div>
      </div>
    </li>
  )
}


