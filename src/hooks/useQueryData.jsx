import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewProduct, getProducts } from '../api/firebase'

export default function useQueryData () {
  const queryClient = useQueryClient()

  const getData = useQuery(['products'], getProducts, {staleTime: 1000 * 60})
  const addProduct = useMutation(({product, url}) => addNewProduct(product,url), {
    onSuccess: () =>queryClient.invalidateQueries(['prorducts'])
  })

  return {getData, addProduct}
}
