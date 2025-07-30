import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Target,
  User,
  ChevronDown,
} from "lucide-react";
import ProfileImageUpload from "./FileUpload";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { SingleuserMapping, userMapping } from "../FieldMapping/userMapping";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";

// TypeScript Interfaces
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "google";
  size?: "lg";
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Design System Components
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "lg",
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm",
    google:
      "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500 shadow-sm",
  };

  const sizes = {
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({
  label,
  icon,
  className = "",
  ...props
} : InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
            ${icon ? "pl-11" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

const Select: React.FC<SelectProps> = ({
  label,
  icon,
  options,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <select
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white
            ${icon ? "pl-11" : ""}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-8 ${className}`}
    >
      {children}
    </div>
  );
};

// Profile Image Upload Component

// Main Signup Component
const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deatils, setDetails] = useState({
    name : "",
    email : "",
    password  : "",
    confirmPassword : "",
    profileImage : ""
});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e : any) => {
    setDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  };

  const handleRegisterUser = async (e : any)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append("name" , deatils.name)
    formData.append("email" , deatils.email)
    formData.append("password" , deatils.password)
    formData.append("profileImage" , deatils.profileImage)

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/createUser` , formData , {withCredentials : true} )
      console.log(res)
      // const data = SingleuserMapping(res.data.data)
      // dispatch(loginSuccess(data))
      // navigate("/member/dashboard")

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl ">
        <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join Project Tracker and start collaborating
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-6">
            {/* Full Name */}
            <div className="flex flex-row space-x-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={deatils.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                icon={<User size={20} />}
              />

              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={deatils.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                icon={<Mail size={20} />}
              />
            </div>

            {/* Password */}
            <div className="flex flex-row space-x-6">
              <div className="relative w-full">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={deatils.password}
                    onChange={handleInputChange}
                  placeholder="Create a password"
                  icon={<Lock size={20} />}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative w-full">
                <Input
                  label="Confirm Password"
                  value={deatils.confirmPassword}
                  onChange={handleInputChange}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  icon={<Lock size={20} />}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Profile Image Upload */}
            <ProfileImageUpload setDetails={setDetails} />

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Create Account Button */}
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              type="submit"
              onClick={(e) => { handleRegisterUser(e) } }
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  or
                </span>
              </div>
            </div>

            {/* Google Signup Button */}
            <Button variant="google" className="w-full" size="lg" type="button">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
              >
                Login
              </button>
              </ Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
