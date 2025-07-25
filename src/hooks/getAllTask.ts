import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loaduser } from "../redux/userSlice"
import { taskMapping } from "../FieldMapping/taskMapping"
import { addTask } from "../redux/taskSlice"

export const UsefetchTask = () => {
        const disptach = useDispatch()
    useEffect(()=>{
       const loadTask = async () => {
            const task = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/getAllTask` , {withCredentials : true} )
            const data = taskMapping(task.data.data)
            console.log(data)
            disptach(addTask(data))
       }
       loadTask()
    },[])
}