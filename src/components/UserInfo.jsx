import React from 'react'

// Navbar에서 props로 user의 정보를 받아 로그인 되었을 때 user의 정보를 옆에 표시해 주는 컴포넌트
export default function UserInfo({user}) {
  return (
    <div className='flex items-center shrink-0'>
      <img className='w-10 h-10 rounded-full mr-2' src={user.photoURL} alt={user.displayName}/>
      {/* 화면이 md사이즈 보다 작을 때는 유저의 이름을 숨겨주도록 반응형으로 구현 */}
      <span className='hidden md:block'>{user.displayName}</span>
    </div>
  )
}
