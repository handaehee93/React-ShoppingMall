import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/AuthContext'

//해당 컴포넌트는 사용자가 로그인을 했는지 확인하고, 해당 사용자가 어드민 권한이 있는지 확인하는 컴포넌트다.
// props로 전달받는 requireAdmin이 true라면 로그인도 되어 있는 상태고, 어드민 권한도 갖고 있는 상태다.
// 조건에 맞지 않으면 최상위 경로로 이동한다, 조건에 맞는 경우에는 전달된 children을 보여준다.
export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext()

  if(!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />
  }

  return children

}
