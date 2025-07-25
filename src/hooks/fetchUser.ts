import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loaduser } from "../redux/userSlice"
import { userMapping } from "../FieldMapping/userMapping"

export const UsefetchUser = () => {
        const disptach = useDispatch()
    useEffect(()=>{
       const loadUser = async () => {
            const user = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/getAllUsers` , {withCredentials : true} )
                const data = userMapping(user.data.data)
                disptach(loaduser(data))
       }
       loadUser()
    },[])
}