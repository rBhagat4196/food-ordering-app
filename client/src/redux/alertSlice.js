import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type : "",
    msg : ""
  }
const AlertSlice = createSlice({
    name: "Alert",
    initialState,
    reducers: {
      alertMsg: (state, action) => {
        state.type = action.payload.type
        state.msg = action.payload.message
      },
    }
});

export const { alertMsg } = AlertSlice.actions;
export default AlertSlice.reducer;
