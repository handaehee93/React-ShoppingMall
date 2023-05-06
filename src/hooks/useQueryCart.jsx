import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AddUpdateToCart,removeFromCart,getCart } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'
import { query } from 'firebase/database'

export default function useQueryCart () {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  
  const cartQuery = useQuery(['carts'], () => getCart(user.uid))

  const updateCart = useMutation((product) => AddUpdateToCart(user.uid, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts'], user.uid)
    }
  })

  const removeCart = useMutation((id) => removeFromCart(user.uid, id), {
    onSuccess:() => {
      queryClient.invalidateQueries(['carts'],user.uid)
    }
  })

  return {cartQuery, updateCart, removeCart}
}