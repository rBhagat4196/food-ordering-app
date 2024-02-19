import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(window?.localStorage.getItem('user-fds')) ?? {name : "rahul"},
  }
const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
        state.user = action.payload
        localStorage.setItem('user-fds', JSON.stringify(action.payload));
        return state.user;
      },
      getUserDetails : (state)=>{
        return state.user
      }
    }
});

export const { setUserDetails ,getUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
