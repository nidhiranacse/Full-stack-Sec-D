import {createSlice} from "@reduxjs/toolkit";
const slice=createSlice({name:"auth",initialState:{user:null,accessToken:null},reducers:{setAuth:(s,a)=>{s.user=a.payload.user;s.accessToken=a.payload.accessToken},setToken:(s,a)=>{s.accessToken=a.payload},logout:s=>{s.user=null;s.accessToken=null}}});
export const {setAuth,setToken,logout}=slice.actions;export default slice.reducer;
