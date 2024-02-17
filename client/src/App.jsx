import { Routes , Route } from 'react-router-dom'
import LoginPage from './pages/login'
import Home from './pages/home'
function App() {

  return (
    <div className='min-h-screen min-w-full h-auto flex flex-col items-center justify-center'>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
