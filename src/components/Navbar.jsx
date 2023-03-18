import React from 'react'
import { Link } from 'react-router-dom'
import {HiShoppingBag} from 'react-icons/hi'
import {GiClothes} from 'react-icons/gi'
import { login } from "../api/firebase";
// import firebase from '../api/firebase'

export default function Navbar() {
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-3xl text-logo'>
        <HiShoppingBag />
        <h1>뉴이어</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>상품</Link>
        <Link to='/carts'>장바구니</Link>
        <Link to='/products/new' className='text-2xl'>
          <GiClothes/>
        </Link>
        <button onClick={login}>Login</button>
      </nav>
    </header>
  )
}
