import  { useDispatch } from "react-redux"

import axios from "axios"
import { loginFailure } from "../redux/userSlice"


export const useLogin =async (email : UserType['email'] , password : UserType['password'])=>{
    const dispatch = useDispatch()

    const login = async() =>{
        try{
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login` , {email , password})
            console.log(res)
        }catch(err : any){
            console.log(err)
            dispatch(loginFailure("login failed"))
        }
    }
    
    await login()
} 