import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getAllUsers } from '../api';
import {setAllUsers} from "../redux/userSlice"
const DbUsers = () => {
  const allUsers = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(getAllUsers == ""){
      getAllUsers().then(data => dispatch(setAllUsers(data)))
    }
  },[])
  console.log(allUsers)
  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      Users
    </div>
  )
}

export default DbUsers
