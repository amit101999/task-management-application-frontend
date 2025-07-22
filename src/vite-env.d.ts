/// <reference types="vite/client" />
interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'google';
  size?: 'lg';
  children: React.ReactNode;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleChange: (e : React.ChangeEvent<HTMLInputElement >) => void
  value : string
  icon?: React.ReactNode;
}
interface UserType {
  id : string , 
  name : string ,
  avatar : string ,
  role : string,
  email : string
  password? : string
}



 interface projectType {
    id : string,
    name : String
  }

  interface ProjectType {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'Active' | 'Completed' | 'On Hold';
  dueDate: string;
  teamMembers: string[];
  totalTasks: number;
  completedTasks: number;
}

interface Task {
  id: string;
  title: string;
  assignedUsers: { id: string; name: string; avatar: string }[];
  status: "To-do" | "In-progress" | "Done";
  dueDate: string;
  projectId: string;
  projectName: string;
  priority: "High" | "Medium" | "Low";
  description: string;
}

interface Project {
  id: string;
  title: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  dueDate: string;
  assignedMembers: number;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}



// member interface
interface NavItem {
  id: string;
  label: string;
  icon: string;
  redirect: string;
}

interface OverviewCardProps {
  title: string;
  value: number;
  description: string;
  icon: string;
  iconBg: string;
  progress?: number;
}

interface TaskItemProps {
  task: MemberTask;
}

interface ProgressBarProps {
  percentage: number;
  delay?: number;
}

interface PlaceholderSectionProps {
  title: string;
}

interface TaskStats {
  total: number;
  inProgress: number;
  completed: number;
}

interface MemberTask {
  id: number;
  title: string;
  project: string;
  due: string;
  status: 'progress' | 'completed' | 'pending';
}

type SectionType = 'dashboard' | 'tasks' | 'projects' | 'profile';