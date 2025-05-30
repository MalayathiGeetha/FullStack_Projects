import { LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS,GET_USER_REQUEST,GET_USER_SUCCESS,LOGIN_REQUEST,LOGIN_SUCCESS } from './ActionType'
import { API_BASE_URL } from '@/config/api'
import axios from 'axios'

export const register=userData=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const {data}=await axios.post(`${API_BASE_URL}/auth/signup`,userData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
            dispatch({type:REGISTER_SUCCESS,payload:data})
        }
        console.log("register success",data)
    }catch(error){
        console.log(error)
    }
}

export const login=userData=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data}=await axios.post(`${API_BASE_URL}/auth/signing`,userData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
            dispatch({type:LOGIN_SUCCESS,payload:data})
        }
        console.log("login success",data)
        console.log(localStorage.getItem("jwt"));

    }catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    console.error("Login error:", error);
  }
}

export const getUser=()=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try{
        const {data}=await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("jwt")}`,
            },
        })
        dispatch({type:GET_USER_SUCCESS,payload:data})
        
        console.log("get user success",data)
    }catch(error){
        console.log(error)
    }
}


export const logout=()=> async(dispatch)=>{
    dispatch({type:LOGOUT})
    localStorage.clear();
}