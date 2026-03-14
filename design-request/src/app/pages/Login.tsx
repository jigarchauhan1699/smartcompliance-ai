import { Link } from "react-router";
import { Mail, Lock, ArrowRight } from "lucide-react";
import logo from "figma:asset/acb187bf1666a83fcaec4c0c3b3f9953dd77af93.png";

export function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="SmartCompliance AI" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartCompliance AI</h1>
          <p className="text-gray-600">Enterprise AML/KYC Intelligence Platform</p>
        </div>

        {/* Login Form */}
        <div className="clean-card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="analyst@company.com"
                  className="clean-input w-full pl-12 pr-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="clean-input w-full pl-12 pr-4 py-3"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            <Link to="/">
              <button 
                type="button"
                className="pill-button-primary w-full py-3.5 font-medium flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Protected by enterprise-grade encryption</p>
          <p className="mt-2">© 2026 SmartCompliance AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
