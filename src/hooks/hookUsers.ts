import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { userMapping } from "../FieldMapping/userMapping"
import { loadUser } from "../redux/userSlice"

export const UsefetchUsers = () => {
        const disptach = useDispatch()
    useEffect(()=>{
       const loadUsers = async () => {
            const task = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/getAllUsers` , {withCredentials : true} )
            const data = userMapping(task.data.data)
            disptach(loadUser(data))
       }
       loadUsers()
    },[])
}
