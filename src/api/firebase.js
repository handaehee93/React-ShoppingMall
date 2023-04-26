import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, DataSnapshot } from "firebase/database";
import {v4 as uuid} from 'uuid'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();




  export   function login() {
      signInWithPopup(auth, provider)
      .catch(console.error);
  }


  export  function logout() {
      signOut(auth)
      .catch(console.error);

  }

  // async를 붙여 비동기로 실행을 하고, 비동기로 데이터를 다 가져 왔다면 await 실행
  export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
      const updatedUser = user ? await adminuser(user) : null

      callback(updatedUser)
    });
  }

  const database = getDatabase(app)
// adminuser함수는 firebase의 database에서 data를 가져온다, 즉 네트워크 통신이 이루어지기 때문에 비동기 처리를 위해 async를 붙여 준다.
  async function adminuser(user) {
    return get(ref(database, 'admins')).then((snapshot) => {
      if(snapshot.exists()) {
        const admins = snapshot.val()
        console.log(admins)
        const isAdmin = admins.includes(user.uid)
        return {...user, isAdmin}
      }
      return user;
    })
  }

  export async function addNewProduct(product, imageURL) {
    const id = uuid()
    set(ref(database, `products/${id}`), {
      ...product,
      id,
      price: parseInt(product.price),
      image: imageURL
    })
  }