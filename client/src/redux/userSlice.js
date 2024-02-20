import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: "",
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
      }
    }
});

export const { setUserDetails ,getUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
