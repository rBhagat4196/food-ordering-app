import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getAllUsers } from '../api';
import {setAllUsers} from "../redux/userSlice"
import { UsersTable} from '../components';
const DbUsers = () => {
  const allUsers = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(allUsers == ""){
      getAllUsers().then(data => dispatch(setAllUsers(data)))
    }
  },[])

  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      {allUsers && 
      <UsersTable data= {allUsers}/>
}
    </div>
  )
}

export default DbUsers
