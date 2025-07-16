import { BrowserRouter as Router , Routes , Route } from 'react-router'
import AdminDashboard from './components/AdminDashboard'
import ProjectsPage from './components/Projects'
import TasksPage from './components/Tasks'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminDashboard /> } />
        <Route path='/projects' element={<ProjectsPage /> } />
        <Route path='/tasks' element={<TasksPage /> } />
      </Routes>
    </Router>
  )
}

export default App