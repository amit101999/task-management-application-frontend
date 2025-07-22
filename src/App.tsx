import { BrowserRouter as Router , Routes , Route } from 'react-router'
import AdminDashboard from './components/Admin/AdminDashboard'
import MembersPage from './components/Admin/MemberPage'
import ProfilePage from './components/Admin/Profile'
import ProjectsPage from './components/Admin/Projects'
import TasksPage from './components/Admin/Tasks'
import MemberDashboard from './components/Member/Dashboard'
import TaskDashboard from './components/Member/Task'
import MemberProjects from './components/Member/Projects'
import LoginPage from './authComponent/LoginPage'
import SignupPage from './authComponent/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminDashboard /> } />
        <Route path='/projects' element={<ProjectsPage /> } />
        <Route path='/tasks' element={<TasksPage /> } />
        <Route path='/members' element={<MembersPage /> } />
        <Route path='/profile' element={<ProfilePage /> } />

        {/* common routes */}
        <Route path='/login' element={<LoginPage /> } />
        <Route path='/signup' element={<SignupPage /> } />

        {/* member routes */}
             <Route path='/member/dashboard' element={<MemberDashboard /> } />
             <Route path='/member/tasks' element={<TaskDashboard /> } />
             <Route path='/member/projects' element={<MemberProjects /> } />
      </Routes>
    </Router>
  )
}

export default App