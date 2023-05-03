import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCart } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'

export default function Cart() {
  const { user } = useAuthContext()
  const {data: products} = useQuery(['carts'], () => getCart(user.uid))
  return (
    <div className='relative'>
      장바구니
      {products && <p className='w-6 h-6 text-center bg-logo text-white font-bold rounded-full absolute -top-5 -right-1 '>{products.length}</p>}
    </div>
  )
}
