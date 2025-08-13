import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { SingleTaskMapping, taskMapping } from "../FieldMapping/taskMapping"
import { addTask, getAllTask } from "../redux/taskSlice"
import { signleProjectFormat } from "../FieldMapping/projectMap"

export const UsefetchTask = () => {
        const disptach = useDispatch()
    useEffect(()=>{
       const loadTask = async () => {
            const task = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/getAllTask` , {withCredentials : true} )
            const data = taskMapping(task.data.data)
            disptach(getAllTask(data))
       }
       loadTask()
    },[])
}
