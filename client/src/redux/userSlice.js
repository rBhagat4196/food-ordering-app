import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: "",
    users : ""
  }
const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
        state.user = action.payload
        // localStorage.setItem('user-fds', JSON.stringify(action.payload));
      },
      getUserDetails : (state)=>{
        return state.user
      },
      setAllUsers : (state,action)=>{
        state.users = action.payload
      },
      getAllUsers : (state)=>{
        return state.users
      }
    }
});

export const { setUserDetails ,getUserDetails,setAllUsers,getAllUsers } = UserSlice.actions;
export default UserSlice.reducer;
