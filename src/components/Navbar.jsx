import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {HiShoppingBag} from 'react-icons/hi'
import {AiFillEdit} from 'react-icons/ai'
import { login, logout, onUserStateChange } from "../api/firebase";
import UserInfo from './UserInfo';

export default function Navbar() {
  const [user, setUser] = useState()
  // console.log(user)
  const handleLogin = () => {
    login().then(user=> setUser(user))  
  }
  const handleLogout = () => {
    logout().then(user=> setUser(user))  
  }
  useEffect(()=>{
    onUserStateChange((user) => {
      console.log(user)
      setUser(user)
    })
  },[])
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
          {user && user.isAdmin && <AiFillEdit/>}
        </Link>
        {user && <UserInfo user={user}/>}
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>LogOut</button>}
      </nav>
    </header>
  )
}


