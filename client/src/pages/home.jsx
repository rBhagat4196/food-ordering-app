
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../redux/userSlice';
const Home = () => {
  const data = useSelector((state) => state.user.user)
  console.log(data)
  return (
    <div>
      home
    </div>
  )
}

export default Home
