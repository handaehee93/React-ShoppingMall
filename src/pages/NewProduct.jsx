import React, { useState } from 'react'
import Button from '../components/ui/Button'
import { uploadImage } from '../api/uploader'
import { addNewProduct } from '../api/firebase'
export default function NewProduct() {
  const [product, setProduct] = useState({})
  // input태그 중에 사진을 올리는 input태그는 string이 아니라 url이므로 따로 state를 만들어 준 것
  const [file, setFile] = useState()
  const [isUploading, setIsUpLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsUpLoading(true)
    // 클라우디너리에 파일이 업데이트가 되면, firebase에 해당 파일의 url과 나머지 상품 정보들을 업로드
    uploadImage(file)
      .then((url) => {
        addNewProduct(product, url)
          .then(() => {
            setSuccess('제품 등록 완료')
            setTimeout(() => {
              setSuccess(null)
            }, 3000)
          })
      })
        .finally(() => setIsUpLoading(false))
  }



  const handleChange = (e) => {
    const {name, value, files} = e.target
    // console.log(typeof(product.price))
    if(name === 'file') {
      setFile(files && files[0])
      return
    }
    setProduct((product) => ({...product, [name]: value}))
  }

  const url = () => {
    return (
      URL.createObjectURL(file)
      // window.URL.revokeObjectURL(file)
    )
  }

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {success && <p className='my-2'>🟢{success}</p>}
      {file && <img className='w-100 m-auto mb-2' src={url()} alt='상품 이미지' />}
      <form className='flex flex-col p-12' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' name='file' onChange={handleChange} required />
        <input type="text" name='title' value={product.title ?? ''} placeholder='제품명' required onChange={handleChange} />
        <input type="number" name='price' value={product.price ?? ''} placeholder='가격' required onChange={handleChange}/>
        <input type="text" name='description' value={product.description ?? ''} placeholder='제품 설명' required onChange={handleChange}/>
        <input type="text" name='options' value={product.options ?? ''} placeholder='옵션(,로 구분) ' required onChange={handleChange}/>
        <Button text={isUploading ? '제품 등록 중' : '제품 등록 하기'} disabled={isUploading}/>
      </form>
    </section>
  )
}



