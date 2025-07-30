import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllProject } from "../redux/projectSlice"
import axios from "axios"
import { formatproject } from "../FieldMapping/projectMap"

export const UseFetchProject = () => {
      const dispatch = useDispatch()
    useEffect(()=>{
      const fetechProjects = async () => {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project/getAllProject` , {withCredentials : true} )
          const data : ProjectType[] = formatproject(res.data.data)
          dispatch(getAllProject(data))
      }
      fetechProjects()
  },[])

}