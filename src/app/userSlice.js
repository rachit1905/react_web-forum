import { createSlice } from "@reduxjs/toolkit";

let userInfo = { name: "", userPhoto: "", userEmail: "" /*uid: "" */ };

if (localStorage.getItem("userInfo"))
  userInfo = JSON.parse(localStorage.getItem("userInfo"));

//   name: "",
//   userPhoto: "",
//   userEmail: "",
//   uid: "",
const initialState = {
  name: userInfo.name,
  userPhoto: userInfo.userPhoto,
  userEmail: userInfo.userEmail,
  // uid: userInfo.uid,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.userPhoto = action.payload.userPhoto;
      state.userEmail = action.payload.userEmail;
      // state.uid = action.payload.uid;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export const selectUserPhoto = (state) => state.user.userPhoto;
export const selectUserEmail = (state) => state.user.userEmail;
// export const selectUid = (state) => state.user.uid;
export default userSlice.reducer;
