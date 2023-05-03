import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get,remove} from "firebase/database";
import {v4 as uuid} from 'uuid'

// firebase에서 제공하는 secret Key를 env파일에 작성 후 불러 온 것
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};


// 가져온 firebase앱을 초기화 해준 것, 개발에서 초기화 란 초기값을 할당을 해주는 것을 의미한다.
const app = initializeApp(firebaseConfig);


// 구글 로그인을 위해 구글 provider를 초기화 해준 것
const provider = new GoogleAuthProvider();
// auth를 가져 온 다음
const auth = getAuth();

// singInWithPopup에 가져온 auth와 provider를 인자로 넣어주면 된다.

  export function login() {
    signInWithPopup(auth, provider)
    // 콜백함수에서 전달하는 인자와 콜백함수에서 호출하는 인자가 같을 때 즉, (error) => console.(error) 일때는 아래 처럼 생략이 가능하다.
    .catch(console.error);
}





  export  function logout() {
      signOut(auth)
      .catch(console.error);

  }

  // 로그인된 사용자의 정보를 기억하기 위해 onAuthStateChanged를 사용하기 위해 함수를 만들어 준 것. async를 붙여 비동기로 실행을 하고, 비동기로 데이터를 다 가져 왔다면 await 실행
  // 사용자가 로그인 상태가 변경이 되면 user정보가 onAuthStateChanged에 전달이 되고, user정보가 있다면 즉, 로그인을 했다면 adminUser함수를 호출해서 사용자가 admin인지 아닌지 까지 검사를 해준다.
  // 사용자가 admin이면 adminUser함수에서 isAdmin이 추가된 객체가 리턴이 되므로, 해당 객체로 다시 user의 상태를 업데이트 해준다.
  export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
      const updatedUser = user ? await adminUser(user) : null
      callback(updatedUser)
    });
  }

// firebase의 database를 초기화 해 준 것
  const database = getDatabase(app)
// adminuser함수는 firebase의 database에서 data를 가져온다, 즉 네트워크 통신이 이루어지기 때문에 비동기 처리를 위해 async를 붙여 준다.
// firebase의 database에 admins를 만들어 두었고, 거기다 관리자 id를 넣어 두었다. 따라서 get을 통해 초기화 해 둔 database의 admins라는 key에 담겨 있는 데이터를 가져오고, 데이터를 잘 가지고 온다면 snapshot이 전달이 된다.
// snapshot 즉, admins라는 key가 존재 한다면, snapshot.val()를 이용해서 key에 담긴 value를 가져 온다.
// 가져온 value가 현재 로그인한 user의 uid와 일치 한다면 true를 일치하지 않는 다면 false를 반환 하게 한 다음
// 기존 user 정보에 isAdmin이 true인지 false인지를 추가해 준다.
  async function adminUser(user) {
    return get(ref(database, 'admins'))
      .then((snapshot) => {
        if(snapshot.exists()) {
          const admins = snapshot.val()
          const isAdmin = admins.includes(user.uid)
          return {...user, isAdmin}
        }
        return user;
    })
  }


  // firebase에 새로운 제품을 등록하는 함수
  // 제품을 등록할 때 제품마다 고유한 id가 필요하므로 uuid 사용
  // firebase에 데이터를 등록할 때는 set을 사용 
  // product에 id를 추가해 주고, price를 받는 input의 value를 콘솔에 찍어 보면 string으로 나오므로 이걸 정수로 변환해 준다.
  // options는 ,로 구분 되어 입력 받을 것이므로 split을 통해 ,로 구분되어 있는 것들을 배열로 저장을 해 준다.
  export async function addNewProduct(product, imageURL) {
    const id = uuid()
    set(ref(database, `products/${id}`), {
      ...product,
      id,
      price: parseInt(product.price),
      image: imageURL,
      options: product.options.split(',')
    })
  }

  // firebase에 저장된 데이터를 불러오는 함수
  export async function getProducts () {
    return get(ref(database, 'products'))
      .then(snapshot => {
        if(snapshot.exists()) {
          return Object.values(snapshot.val())
        }
        return []
      })
  }
  // firebase의 장바구니에 목록을 추가하고 업데이트 하는 함수
  export async function AddUpdateToCart (id, product) {
    return set(ref(database, `carts/${id}/${product.id}`), product)
  }

  // firebase에 저장된 장바구니 목록을 불러오는 함수, 사용자 마다 고유한 Id가 있고, 해당 Id에 저장된 장바구니 목록을 불러와야 하므로 인자로 Id가 들어 간다.
  export async function getCart (id) {
    return get(ref(database, `carts/${id}`))
      .then(snapshot => {
        const items = snapshot.val() || { }
        return Object.values(items)
      })
  }


  // firebase의 장바구니의 목록을 삭제하는 함수
  export async function removeFromCart (id, product) {
    return remove(ref(database, `carts/${id}/${product.id}`))
  }