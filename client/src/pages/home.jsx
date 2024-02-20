
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../redux/userSlice';
import {Header} from "../components"
const Home = () => {

  return (
    <main className= "w-screen h-screen flex items-center justify-center flex-col bg-primary">
      <Header/>
    </main>
  )
}

export default Home
