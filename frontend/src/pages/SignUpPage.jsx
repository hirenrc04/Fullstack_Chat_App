import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, MessageSquare, User, Lock, LockOpen, Loader2 } from 'lucide-react';


export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email Format");
    if (!formData.password.length > 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if(success === true) signup(formData);
  };

  return (
    
    <div className="min-h-screen bg-base-200 flex items-center justify-baseline px-4">

      {/* Left Side */}
      <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-base-100 shadow-xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <MessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2 text-center">Create Account</h1>
          <p className="text-sm text-base-content/60">Get started with your free account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="form-control">
            <label className="label flex justify-start">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full pl-10"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40" />
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label flex justify-start">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full pl-10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label flex justify-start">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input input-bordered w-full pl-10 pr-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                { showPassword ?  (<LockOpen className="size-5 text-base-content/40"/>) : (<Lock className="size-5 text-base-content/40"/>)}
              </span>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          {/* <div className="form-control mt-4"> */}
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className='size-5 animate-spin'/>
                  Loading...
                </>
              ) : (
                "Create Account!"
              )}
            </button>
        </form>

        <div className='text-center p-5'>
          <p className='text-base-content/40'>
              Already have an account? {" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
          </p>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
