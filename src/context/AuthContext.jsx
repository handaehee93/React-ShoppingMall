import { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext()
// user의 정보를 필요로 하는 컴포넌트는 navbar와 protected route등 하나가 아니므로 context를 사용하여 전역적으로 사용할 수 있도록 해준 것
export function AuthContextProvider({children}) {
  const [user, setUser] = useState()
  useEffect(()=>{
    onUserStateChange((user) => {
      console.log(user)
      setUser(user)
    })
  },[])
  return(
    // Provider의 자식 컴포넌트에서 사용할 수 있는 값들을 value로 내려주는 것
    <AuthContext.Provider value={{user, login: login, logout: logout}}>
      {children}
    </AuthContext.Provider>
  )
}

// 원래 해당 context를 사용하고 싶은 곳에 가서 useContext에 createContext로 만들어 둔 AuthContext를 인자로 넣어 context를 사용해야 하는데 아래와 같이 함수로 만들어 두면 뭘 인자로 넣을지 생각하지 않아도 쉽게 사용할 수 있다.
export function useAuthContext() {
  return useContext(AuthContext)
}