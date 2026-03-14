import { Link } from "react-router";
import { Mail, Lock, User, Building, ArrowRight } from "lucide-react";
import logo from "figma:asset/acb187bf1666a83fcaec4c0c3b3f9953dd77af93.png";

export function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="SmartCompliance AI" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartCompliance AI</h1>
          <p className="text-gray-600">Start your compliance intelligence journey</p>
        </div>

        {/* Signup Form */}
        <div className="clean-card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Smith"
                  className="clean-input w-full pl-12 pr-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Acme Financial Corp"
                  className="clean-input w-full pl-12 pr-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Email
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
                  placeholder="Create a strong password"
                  className="clean-input w-full pl-12 pr-4 py-3"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
              <span className="text-sm text-gray-600">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <Link to="/">
              <button 
                type="button"
                className="pill-button-primary w-full py-3.5 font-medium flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Enterprise-grade security and compliance</p>
          <p className="mt-2">© 2026 SmartCompliance AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
