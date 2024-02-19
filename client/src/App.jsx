import { Routes , Route, useNavigate } from 'react-router-dom'
import LoginPage from './pages/login'
import Home from './pages/home'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { app } from './config/firebase'
import { validateJWTToken } from './api'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './redux/userSlice'
import { fadeOut } from './animations'
import { motion } from 'framer-motion'
function App() {
  const auth = getAuth(app)
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch();
  // console.log(auth)
  useEffect(()=>{
    setIsLoading(true)
    auth.onAuthStateChanged((cred) => {
      console.log("trying to login")
      if(cred){
        cred.getIdToken().then(token =>{
          validateJWTToken(token).then((data) => dispatch(setUserDetails(data)))
        })
      }
    })
    setInterval(()=>{
      setIsLoading(false);
    },3000)
  },[])
  return (
    <div className='min-h-screen min-w-full h-auto flex flex-col items-center justify-center'>
      {isLoading && (
        <motion.div {...fadeOut} className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full ">
          Loading...
        </motion.div>
      )}
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
