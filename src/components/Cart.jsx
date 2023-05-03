import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCart } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'

export default function Cart() {
  const { uid } = useAuthContext()
  const {data: products} = useQuery(['carts'], () => getCart(uid))
  return (
    <div>
      dd
      {products && <p>{products.length}</p>}
    </div>
  )
}
