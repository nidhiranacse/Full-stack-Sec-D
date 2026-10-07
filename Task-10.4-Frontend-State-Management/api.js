import axios from "axios";import {store} from "./store";import {setToken,logout} from "./authSlice";
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL,withCredentials:true});
api.interceptors.request.use(c=>{const t=store.getState().auth.accessToken;if(t)c.headers.Authorization=`Bearer ${t}`;return c});
api.interceptors.response.use(r=>r,async e=>{const o=e.config;if(e.response?.status===401&&!o._retry){o._retry=true;try{const {data}=await api.post("/api/auth/refresh");store.dispatch(setToken(data.accessToken));o.headers.Authorization=`Bearer ${data.accessToken}`;return api(o)}catch{store.dispatch(logout())}}return Promise.reject(e)});
