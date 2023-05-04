import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { AddUpdateToCart } from '../api/firebase'
import {useAuthContext} from '../context/AuthContext'
export default function ProductDetail() {
  const navigate = useNavigate()
  // useLoacation을 활용하여 useParam으로 전달된 state를 받아 옴
  const {state: {
    product: {id, image, title, category,price, description, options }
  }} = useLocation()

  const {user } = useAuthContext()
  const handleClick = () => {
    const cart = {id, image, title, price, quantity: 1 }
    AddUpdateToCart(user.uid, cart)
    const answer = window.confirm(`상품이 장바구니에 담겼습니다.
    장바구니로 이동시하겠습니까?`)
    if( answer === true ) {
      navigate('/carts')
    }
  }
  return (
    <div>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img className='w-full basis-7/12' src={image} alt={title} />
        <div className='basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2 border-b border-gray-300'>{title}</h2>
          <p className='text-2xl font-bold py-2'>$ {price} </p>
          <p>{description}</p>
          <Button text='장바구니에 추가' onClick={handleClick}/>
        </div>
      </section>
    </div>
  )
}

